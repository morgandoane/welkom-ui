import { HoldResolutionInput } from '../../HoldResolution/HoldResolutionInput';
import { HoldClass } from '../HoldClass';

export interface CreateHoldInput {
    reason: string;
    resolution: HoldResolutionInput | null;
    class: HoldClass;
}
