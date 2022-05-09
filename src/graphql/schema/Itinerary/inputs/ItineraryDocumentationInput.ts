import { Ref } from '../../../types';
import { Company } from '../../Company/Company';

export interface ItineraryDocumentationInput {
    carrier: Ref<Company>;
    code: string;
}
