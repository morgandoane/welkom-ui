import { ItemFragment } from './../Item/Item';
import { AppFragment } from './../../types';
import { LotContentFragment } from './../LotContent/LotContent';
import { Identified } from './../Base/Base';
import { TinyLocation, TinyLocationFragment } from './../Location/Location';
import { TinyCompany, TinyCompanyFragment } from './../Company/Company';
import {
    TinyProductionLine,
    TinyProductionLineFragment,
} from './../ProductionLine/ProductionLine';
import {
    ExpenseSummary,
    ExpenseSummaryFragment,
} from './../ExpenseSummary/ExpenseSummary';
import { Expensed, ExpensedFragment } from './../Expensed/Expensed';
import { LotContent } from '../LotContent/LotContent';
import { TinyItem } from '../Item/Item';
import { gql } from '@apollo/client';
import { BaseUnit } from '../../inputsTypes';

export interface Lot extends Expensed {
    code: string;
    item: TinyItem;
    production_line: TinyProductionLine | null;
    company: TinyCompany;
    location: TinyLocation | null;
    contents: LotContent[];
    quantity: number;
    base_unit: BaseUnit;
    expense_summaries: ExpenseSummary[] | null;
}

export interface TinyLot extends Identified {
    code: string;
    item: TinyItem;
    company: TinyCompany;
}

export const LotFragment = new AppFragment(
    gql`
        fragment LotFragment on Lot {
            ...ExpensedFragment
            code
            item {
                ...ItemFragment
            }
            production_line {
                ...TinyProductionLineFragment
            }
            company {
                ...TinyCompanyFragment
            }
            location {
                ...TinyLocationFragment
            }
            contents {
                ...LotContentFragment
            }
            quantity
            base_unit
            expense_summaries {
                ...ExpenseSummaryFragment
            }
        }
    `,
    [
        ExpensedFragment,
        ItemFragment,
        TinyProductionLineFragment,
        TinyCompanyFragment,
        TinyLocationFragment,
        LotContentFragment,
        ExpenseSummaryFragment,
    ]
);

export const TinyLotFragment = new AppFragment(
    gql`
        fragment TinyLotFragment on Lot {
            _id
            code
            item {
                ...TinyItemFragment
            }
            company {
                ...TinyCompanyFragment
            }
        }
    `,
    [ItemFragment, TinyCompanyFragment]
);
