import { PaginateArg } from "../Pagination/Pagination";

export interface LocationFIlter extends PaginateArg {
  company?: string;
  label?: string;
  mine?: boolean;
}
