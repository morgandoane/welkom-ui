import { UpdateBaseInput } from '../../Base/inputs/UpdateBaseInput';
import { HoldResolutionInput } from '../../HoldResolution/HoldResolutionInput';
import { HoldClass } from '../HoldClass';

export interface UpdateHoldInput extends UpdateBaseInput {
    reason?: string;
    resolution?: HoldResolutionInput | null;
    class?: HoldClass;
}
