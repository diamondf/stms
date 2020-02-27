import produce from 'immer';
import * as providerActions from './provider.action';
import {Provider} from '../../../services/provider.config';
import {Item} from '../model/item.model';

export interface ProviderState {
    provider: Provider;
    items: Item[];
    okState: boolean;
}

export const INITIAL_PROVIDER_STATE: ProviderState = {
    provider: undefined,
    items: [],
    okState: undefined,
};

export function providerReducer(state: ProviderState = INITIAL_PROVIDER_STATE, action: providerActions.Actions) {
    return produce(state, draftState => {
        switch (action.type) {
            case providerActions.ProviderActionsTypes.SET_PROVIDER:
                draftState.provider = (action as providerActions.SetProviderAction).payload;
                return;

            case providerActions.ProviderActionsTypes.FETCH_ITEMS:
                draftState.okState = undefined;
                return;

            case providerActions.ProviderActionsTypes.SET_ITEMS:
                draftState.okState = true;
                draftState.items = (action as providerActions.SetItemsAction).payload;
                return;

            case providerActions.ProviderActionsTypes.ERROR_FETCH:
                draftState.okState = false;
                return;

            case providerActions.ProviderActionsTypes.RESET_PROVIDER:
                draftState = INITIAL_PROVIDER_STATE;
                return;
        }
    });
}