import { Ref } from '../../../types';
import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { Item } from '../../Item/Item';
import { Location } from '../../Location/Location';
import { QualityCheckAction } from '../QualityCheckAction';
import { QualityCheckClass } from '../QualityCheckClass';
import { QualityCheckOptionInput } from '../QualityCheckOption';

export interface UpdateQualityCheckInput extends UpdateBaseInput {
    action: QualityCheckAction;
    class: QualityCheckClass;
    prompt: string;
    items: Ref<Item>[];
    locations: Ref<Location>[];
    options: QualityCheckOptionInput[];
    acceptable_range?: number[];
}
