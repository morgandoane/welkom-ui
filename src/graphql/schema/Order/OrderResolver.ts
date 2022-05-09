import { Context } from '@src/auth/context';
import { Permitted } from '@src/auth/middleware/Permitted';
import { Permission } from '@src/auth/permissions';
import { Ref } from '@typegoose/typegoose';
import {
    Arg,
    Ctx,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
} from 'type-graphql';
import { createBaseResolver } from '../Base/createBaseResolver';
import { ObjectIdScalar } from '../ObjectIdScalar/ObjectIdScalar';
import { Paginate } from '../Pagination/Pagination';
import { CreateOrderInput } from './inputs/CreateOrderInput';
import { OrderFilter } from './inputs/OrderFilter';
import { UpdateOrderInput } from './inputs/UpdateOrderInput';
import { Order } from './Order';
import { OrderList } from './OrderList';
import { OrderLoader } from './OrderLoader';
import { OrderModel } from './OrderModel';

const OrderResolverBase = createBaseResolver();

@Resolver(() => Order)
export class OrderResolver extends OrderResolverBase {
    @UseMiddleware(
        Permitted({ type: 'permission', permission: Permission.GetOrder })
    )
    @Query(() => Order)
    async order(
        @Arg('id', () => ObjectIdScalar) id: Ref<Order>
    ): Promise<Order> {
        return await OrderLoader.load(id, true);
    }

    @UseMiddleware(
        Permitted({ type: 'permission', permission: Permission.GetOrder })
    )
    @Query(() => OrderList)
    async orders(@Arg('filter') filter: OrderFilter): Promise<OrderList> {
        return await Paginate.paginate({
            model: OrderModel,
            query: await filter.serializeOrderFilter(),
            sort: { timestamp: -1 },
            skip: filter.skip,
            take: filter.take,
        });
    }

    @UseMiddleware(
        Permitted({ type: 'permission', permission: Permission.CreateOrder })
    )
    @Mutation(() => Order)
    async createOrder(
        @Ctx() context: Context,
        @Arg('data') data: CreateOrderInput
    ): Promise<Order> {
        const res = await OrderModel.create(
            await data.validateOrderCreation(context)
        );

        return res.toObject();
    }

    @UseMiddleware(
        Permitted({ type: 'permission', permission: Permission.UpdateOrder })
    )
    @Mutation(() => Order)
    async updateOrder(
        @Ctx() context: Context,
        @Arg('id', () => ObjectIdScalar) id: Ref<Order>,
        @Arg('data') data: UpdateOrderInput
    ): Promise<Order> {
        await OrderLoader.load(id, true);

        const res = await OrderModel.findByIdAndUpdate(
            id,
            await data.validateOrderUpdate(context),
            { new: true }
        );

        OrderLoader.clear(id);

        return res.toObject();
    }
}
