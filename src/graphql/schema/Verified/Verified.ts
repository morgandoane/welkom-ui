import { Base } from "./../Base/Base";
import { Verification } from "../Verification/Verification";

export interface Verified extends Base {
  verification?: Verification | null;
}
