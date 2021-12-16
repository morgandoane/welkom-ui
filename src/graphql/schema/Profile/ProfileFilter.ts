import { PaginateArg } from "../Pagination/Pagination";

export interface ProfileFilter extends PaginateArg {
  name?: string;
}
