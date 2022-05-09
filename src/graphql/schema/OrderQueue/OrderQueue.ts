import { modelOptions, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Profile } from '../Profile/Profile';
import { OrderQueueLine } from './OrderQueueLine';

@modelOptions({
    schemaOptions: {
        collection: 'orderqueues',
    },
})
@ObjectType()
export class OrderQueue {
    @Field(() => Profile)
    @prop({ required: true })
    profile!: string;

    @Field(() => [OrderQueueLine])
    @prop({ required: true, type: OrderQueueLine })
    lines!: OrderQueueLine[];
}
