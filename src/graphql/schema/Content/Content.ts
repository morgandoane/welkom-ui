import { Location } from "../Location/Location";
import { Unit } from "../Unit/Unit";
import { Item } from "../Item/Item";
import { Lot } from "../Lot/Lot";

export interface Content {
  quantity: number;
  unit: Unit;
}

export interface ItemContent extends Content {
  item: Item;
}

export interface ItemPluralContent extends Content {
  items: Item[];
}

export interface OrderContent extends ItemContent {
  location: Location;
}

export interface LotContent extends Content {
  lot: Lot;
}
