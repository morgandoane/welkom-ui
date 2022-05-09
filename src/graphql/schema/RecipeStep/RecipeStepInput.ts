import { Ref } from '../../types';
import { Item } from '../Item/Item';
import { Unit } from '../Unit/Unit';

export type RecipeStepInput =
    | {
          english?: string;
          spanish?: string;
      }
    | {
          items?: Ref<Item>[];
          client_unit?: Ref<Unit>;
          client_qty?: number;
      };
