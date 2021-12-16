import { Base } from "../Base/Base";
import { Folder } from "../Folder/Folder";
import { Item } from "../Item/Item";

export interface Recipe extends Base {
  name: string;
  item: Item;
  folder?: Folder;
}
