import { TypeNamed } from "./../types";
import { Item } from "./Item";
import { Location } from "./Location";
import { Lot } from "./Lot";
import { Unit } from "./Unit";

export interface Content {
  __typename: "Content";
  quantity: number;
  unit: Unit;
}

export interface ItemContent extends TypeNamed<Content> {
  __typename: "ItemContent";
  item: Item;
}

export interface ItemPluralContent extends TypeNamed<Content> {
  __typename: "ItemPluralContent";
  items: Item[];
}

export interface OrderContent extends TypeNamed<ItemContent> {
  __typename: "OrderContent";
  location: Location;
}

export interface LotContent extends TypeNamed<Content> {
  __typename: "LotContent";
  lot: Lot;
}

export interface ProceduralLotContent extends TypeNamed<LotContent> {
  __typename: "ProceduralLotContent";
}
