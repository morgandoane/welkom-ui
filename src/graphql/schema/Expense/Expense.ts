import { Base } from "../Base/Base";
import { Company } from "../Company/Company";

export interface Expense extends Base {
  amount: number;
  customer: Company;
  vendor: Company;
  note?: string;
}
