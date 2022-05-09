import { Field, InputType } from 'type-graphql';
import { FilterQuery } from 'mongoose';
import { Order } from '../Order';
import { BaseFilter } from '@src/schema/Base/inputs/BaseFilter';

@InputType()
export class OrderFilter extends BaseFilter {
    @Field({ nullable: true })
    name?: string;

    public async serializeOrderFilter(): Promise<FilterQuery<Order>> {
        const query: FilterQuery<Order> = {
            ...(await this.serializeBaseFilter()),
        };

        if (this.name) {
            query.$or = [
                { english: { $regex: new RegExp(this.name, 'i') } },
                { spanish: { $regex: new RegExp(this.name, 'i') } },
            ];
        }
        return query;
    }
}
