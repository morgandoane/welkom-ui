import { TinyItem } from './../Item/Item';
import { UnitClass } from './../Unit/Unit';

export interface OrderStatisticRangeQuantity {
    unit_class: UnitClass;
    quantity: number;
}

export interface OrderStatisticRange {
    month: number;
    quantitys: OrderStatisticRangeQuantity[];
}

export interface OrderStatistic {
    item: TinyItem;
    ranges: OrderStatisticRange[];
}
