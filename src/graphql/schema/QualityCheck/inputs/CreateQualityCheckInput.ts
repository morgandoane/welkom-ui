import { Ref } from '../../../types';
import { Item } from '../../Item/Item';
import { Location } from '../../Location/Location';
import { QualityCheckAction } from '../QualityCheckAction';
import { QualityCheckClass } from '../QualityCheckClass';
import { QualityCheckOptionInput } from '../QualityCheckOption';

export interface CreateQualityCheckInput {
    action: QualityCheckAction;
    class: QualityCheckClass;
    prompt: string;
    items: Ref<Item>[];
    locations: Ref<Location>[];
    options: QualityCheckOptionInput[];
    acceptable_range?: number[];
}
