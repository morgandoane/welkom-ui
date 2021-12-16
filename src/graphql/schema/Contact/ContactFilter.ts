import { BaseFilter } from "./../Base/BaseFilter";

export interface ContactFilter extends BaseFilter {
  name?: string;
  company?: string;
}
