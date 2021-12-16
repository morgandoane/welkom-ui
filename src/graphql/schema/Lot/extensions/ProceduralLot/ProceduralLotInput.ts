import { UpdateLotInput } from "../../LotInput";
import { ProceduralLotContentInput } from "../../../Content/ContentInputs";
import { LotInput } from "../../LotInput";

export interface ProceduralLotInput extends LotInput {
  contents: ProceduralLotContentInput[];
}

export interface UpdateProceduralLotInput extends UpdateLotInput {
  contents?: ProceduralLotContentInput[];
}
