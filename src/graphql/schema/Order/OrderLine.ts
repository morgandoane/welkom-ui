import { prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';
import { Appointment } from '../Appointment/Appointment';
import { Content } from '../Content/Content';

@ObjectType()
export class OrderLine {
    @Field(() => Appointment)
    @prop({ required: true })
    appointment!: Appointment;

    @Field(() => [Content])
    @prop({ required: true, type: Content })
    contents!: Content[];
}
