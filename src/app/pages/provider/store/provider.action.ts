import {Action} from '@ngrx/store';
import {Provider} from '../../../services/provider.config';
import {Item} from '../model/item.model';

export enum ProviderActionsTypes {
    SET_PROVIDER = '[Provider] Set provider',
    FETCH_ITEMS = '[Provider] Fetch items',
    SET_ITEMS = '[Provider] Set items',
    RESET_PROVIDER = '[Provider] Reset providers and items',
    ERROR_FETCH = '[Provider] Items request was failed'
}

export class SetProviderAction implements Action {
    readonly type = ProviderActionsTypes.SET_PROVIDER;

    constructor(public payload: Provider) {
    }
}

export class FetchItemsAction implements Action {
    readonly type = ProviderActionsTypes.FETCH_ITEMS;

    constructor(public payload: Provider) {
    }
}

export class SetItemsAction implements Action {
    readonly type = ProviderActionsTypes.SET_ITEMS;

    constructor(public payload: Item[]) {
    }
}

export class ResetProviderAction implements Action {
    readonly type = ProviderActionsTypes.RESET_PROVIDER;
}

export class ErrorFetchAction implements Action {
    readonly type = ProviderActionsTypes.ERROR_FETCH;
}

export type Actions =
  SetProviderAction
  | FetchItemsAction
  | SetItemsAction
  | ResetProviderAction
  | ErrorFetchAction;
