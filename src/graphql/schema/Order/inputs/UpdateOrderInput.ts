import { Context } from '@src/auth/context';
import { UpdateBaseInput } from '@src/schema/Base/inputs/UpdateBaseInput';
import { Company } from '@src/schema/Company/Company';
import { ObjectIdScalar } from '@src/schema/ObjectIdScalar/ObjectIdScalar';
import { Ref } from '@typegoose/typegoose';
import { Field, InputType } from 'type-graphql';
import { Order } from '../Order';
import { OrderLineInput } from './OrderlineInput';

@InputType()
export class UpdateOrderInput extends UpdateBaseInput {
    @Field({ nullable: true })
    code?: string;

    @Field(() => ObjectIdScalar, { nullable: true })
    customer?: Ref<Company> | null;

    @Field(() => ObjectIdScalar, { nullable: true })
    vendor?: Ref<Company> | null;

    @Field(() => [OrderLineInput])
    lines?: OrderLineInput[];

    public async validateOrderUpdate(
        context: Context
    ): Promise<Partial<Order>> {
        const doc: Partial<Order> = {
            ...(await this.validateBaseUpdate(context)),
        };

        if (this.code) doc.code = this.code;
        if (this.customer !== undefined) doc.customer = this.customer;
        if (this.vendor !== undefined) doc.vendor = this.vendor;
        if (this.lines !== null && this.lines !== undefined)
            doc.lines = await Promise.all(
                this.lines.map((line) => line.validateOrderLine())
            );

        return doc;
    }
}
