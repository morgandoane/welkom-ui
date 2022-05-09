import { prop, Ref } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Company } from '../Company/Company';
import { Location } from '../Location/Location';
import { Item } from '../Item/Item';
import { ObjectIdScalar } from '../ObjectIdScalar/ObjectIdScalar';
import { Unit } from '../Unit/Unit';
import { Itinerary } from '../Itinerary/Itinerary';
import { Bol } from '../Bol/Bol';
import { Order } from '../Order/Order';
import { UserInputError } from 'apollo-server-express';
import { Context } from '@src/auth/context';
import { LocationLoader } from '../Location/LocationLoader';
import { UnitLoader } from '../Unit/UnitLoader';
import { ItemLoader } from '../Item/ItemLoader';
import { UnitClass } from '../Unit/UnitClass';

@ObjectType()
export class OrderQueueLine {
    @Field(() => ObjectIdScalar, { nullable: true })
    @prop({ required: false, ref: () => Item })
    item!: Ref<Item> | null;

    @Field({ nullable: true })
    @prop({ required: false })
    quantity!: number | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    @prop({ required: false, ref: () => Unit })
    unit!: Ref<Unit> | null;

    @Field({ nullable: true })
    @prop({ required: false })
    code!: string | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    @prop({ required: false, ref: () => Company })
    vendor!: Ref<Company> | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    @prop({ required: false, ref: () => Location })
    destination!: Ref<Location> | null;

    @Field({ nullable: true })
    @prop({ required: false })
    date!: Date | null;

    @Field({ nullable: true })
    @prop({ required: false })
    time!: number | null;

    public async publish(context: Context): Promise<{
        order: Order;
        itinerary: Itinerary;
        bol: Bol;
    }> {
        if (!this.item)
            throw new UserInputError('Queue line must have an item.');

        if (!this.quantity)
            throw new UserInputError('Queue line must have a quantity.');

        if (!this.unit)
            throw new UserInputError('Queue line must have a unit.');

        if (!this.code)
            throw new UserInputError('Queue line must have a code.');

        if (!this.vendor)
            throw new UserInputError('Queue line must have a vendor.');

        if (!this.destination)
            throw new UserInputError('Queue line must have a destination.');

        if (!this.date)
            throw new UserInputError('Queue line must have a date.');

        const destination = await LocationLoader.load(this.destination, true);
        const item = await ItemLoader.load(this.item, true);
        const unit = await UnitLoader.load(this.unit, true);

        switch (item.unit_class) {
            case UnitClass.Count: {
                if (unit.class !== UnitClass.Count)
                    throw new Error(
                        `${item.english} can only be measured in Count units`
                    );
                break;
            }
            case UnitClass.Length: {
                if (unit.class !== UnitClass.Length)
                    throw new Error(
                        `${item.english} can only be measured in Length units`
                    );
                break;
            }
            case UnitClass.Weight:
            case UnitClass.Volume: {
                if (
                    unit.class !== UnitClass.Weight &&
                    unit.class !== UnitClass.Volume
                )
                    throw new Error(
                        `${item.english} can only be measured in Weight or Volume units`
                    );
                break;
            }
        }

        const order: Order = {
            ...context.base,
            code: this.code,
            customer: destination.company,
            vendor: this.vendor,
            lines: [
                {
                    appointment: {
                        company: destination.company,
                        location: destination._id,
                        date: this.date,
                        time: this.time,
                    },
                    contents: [
                        {
                            item: this.item,
                            client_unit: this.unit,
                            client_qty: this.quantity,
                            base_qty:
                                unit.class_per_unit *
                                item.conversion *
                                this.quantity,
                        },
                    ],
                },
            ],
        };

        const itinerary: Itinerary = {
            ...context.base,
            order: order._id,
            expenses: [],
        };

        const bol: Bol = {
            ...context.base,
            itinerary: itinerary._id,
            from: {
                company: this.vendor,
                date: this.date,
            },
            to: {
                company: destination.company,
                location: destination._id,
                date: this.date,
                time: this.time,
            },
            contents: [
                {
                    item: this.item,
                    client_unit: this.unit,
                    client_qty: this.quantity,
                    base_qty:
                        unit.class_per_unit * item.conversion * this.quantity,
                },
            ],
            itinerary_expenses: [],
            lot_codes: [],
        };

        return {
            order,
            itinerary,
            bol,
        };
    }
}
