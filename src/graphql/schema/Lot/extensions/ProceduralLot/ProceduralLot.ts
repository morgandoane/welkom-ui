import { LotContent } from '../../../Content/Content';
import { Lot } from '../../Lot';

export type ProceduralLotContent = LotContent;

export interface ProceduralLot extends Lot {
    contents: ProceduralLotContent[];
}
