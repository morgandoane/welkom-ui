import { Base } from "./../Base/Base";

export interface Contact extends Base {
  given_name: string;
  family_name: string;
  email?: string;
  email_on_order?: boolean;
  cc_on_order?: boolean;
  phone?: string;
}
