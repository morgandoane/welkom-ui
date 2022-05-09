import { AppointmentInput } from '@src/schema/Appointment/AppointmentInput';
import { ContentInput } from '@src/schema/Content/ContentInput';
import { Field, InputType } from 'type-graphql';
import { OrderLine } from '../OrderLine';

@InputType()
export class OrderLineInput {
    @Field(() => AppointmentInput)
    appointment!: AppointmentInput;

    @Field(() => [ContentInput])
    contents!: ContentInput[];

    public async validateOrderLine(): Promise<OrderLine> {
        return {
            ...this,
            contents: await Promise.all(
                this.contents.map((content) => content.validateContentInput())
            ),
        };
    }
}
