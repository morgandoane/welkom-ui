import { Context } from '@src/auth/context';
import { Company } from '@src/schema/Company/Company';
import { ObjectIdScalar } from '@src/schema/ObjectIdScalar/ObjectIdScalar';
import { Ref } from '@typegoose/typegoose';
import { Field, InputType } from 'type-graphql';
import { Order } from '../Order';
import { OrderLineInput } from './OrderlineInput';

@InputType()
export class CreateOrderInput {
    @Field()
    code!: string;

    @Field(() => ObjectIdScalar, { nullable: true })
    customer!: Ref<Company> | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    vendor!: Ref<Company> | null;

    @Field(() => [OrderLineInput])
    lines!: OrderLineInput[];

    public async validateOrderCreation(context: Context): Promise<Order> {
        const doc: Order = {
            ...context.base,
            ...this,
            lines: await Promise.all(
                this.lines.map((line) => line.validateOrderLine())
            ),
        };

        return doc;
    }
}
