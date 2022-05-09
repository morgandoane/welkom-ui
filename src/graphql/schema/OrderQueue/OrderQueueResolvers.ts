import { Context } from '@src/auth/context';
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql';
import { Permitted } from '../../auth/middleware/Permitted';
import { Permission } from '../../auth/permissions';
import { BolModel } from '../Bol/BolModel';
import { ItineraryModel } from '../Itinerary/ItineraryModel';
import { OrderModel } from '../Order/OrderModel';
import { OrderQueueLineInput } from './inputs/OrderQueueLineInput';
import { OrderQueue } from './OrderQueue';
import { OrderQueueModel } from './OrderQueueModel';

@Resolver(() => OrderQueue)
export class OrderQueueResolvers {
    @UseMiddleware(
        Permitted({ type: 'permission', permission: Permission.CreateOrder })
    )
    @Query(() => OrderQueue)
    async orderQueue(@Ctx() context: Context): Promise<OrderQueue> {
        const doc = await OrderQueueModel.findOne({
            profile: context.base.created_by,
        });

        if (doc) return doc.toObject();

        const newQueue: OrderQueue = {
            profile: context.base.created_by,
            lines: [],
        };

        const res = await OrderQueueModel.create(newQueue);

        return res.toObject();
    }

    @UseMiddleware(
        Permitted({ type: 'permission', permission: Permission.CreateOrder })
    )
    @Mutation(() => Boolean)
    async updateOrderQueue(
        @Ctx() context: Context,
        @Arg('lines', () => [OrderQueueLineInput]) lines: OrderQueueLineInput[]
    ): Promise<boolean> {
        const doc = await OrderQueueModel.findOne({
            profile: context.base.created_by,
        });

        if (doc) {
            doc.lines = await Promise.all(
                lines.map((line) => line.validateOrderQueueLine())
            );

            await doc.save();
        } else {
            const newQueue: OrderQueue = {
                profile: context.base.created_by,
                lines: await Promise.all(
                    lines.map((line) => line.validateOrderQueueLine())
                ),
            };

            await OrderQueueModel.create(newQueue);
        }

        return true;
    }

    @UseMiddleware(
        Permitted({ type: 'permission', permission: Permission.CreateOrder })
    )
    @Mutation(() => Boolean)
    async processOrderQueue(
        @Ctx() context: Context,
        @Arg('lines', () => [OrderQueueLineInput]) lines: OrderQueueLineInput[]
    ): Promise<boolean> {
        const queueLines = await Promise.all(
            lines.map((line) => line.validateOrderQueueLine())
        );

        const cleansed = await Promise.all(
            queueLines.map((line) => line.publish(context))
        );

        for (const { order, itinerary, bol } of cleansed) {
            await OrderModel.create(order);
            await ItineraryModel.create(itinerary);
            await BolModel.create(bol);
        }

        return true;
    }
}
