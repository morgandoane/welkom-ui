import { Ref } from '@typegoose/typegoose';
import { Field, InputType } from 'type-graphql';
import { Company } from '../../Company/Company';
import { Item } from '../../Item/Item';
import { Location } from '../../Location/Location';
import { ObjectIdScalar } from '../../ObjectIdScalar/ObjectIdScalar';
import { Unit } from '../../Unit/Unit';
import { OrderQueueLine } from '../OrderQueueLine';

@InputType()
export class OrderQueueLineInput {
    @Field(() => ObjectIdScalar, { nullable: true })
    item!: Ref<Item> | null;

    @Field({ nullable: true })
    quantity!: number | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    unit!: Ref<Unit> | null;

    @Field({ nullable: true })
    code!: string | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    vendor!: Ref<Company> | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    destination!: Ref<Location> | null;

    @Field({ nullable: true })
    date!: Date | null;

    @Field({ nullable: true })
    time!: number | null;

    public async validateOrderQueueLine(): Promise<OrderQueueLine> {
        const line = new OrderQueueLine();

        line.item = this.item;
        line.quantity = this.quantity;
        line.unit = this.unit;
        line.code = this.code;
        line.vendor = this.vendor;
        line.destination = this.destination;
        line.date = this.date;
        line.time = this.time;

        return line;
    }
}
