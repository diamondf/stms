import produce from 'immer';
import * as favoritesActions from './favorites.action';
import {FavoritesItem} from '../model/favorites.model';

export interface FavoritesState {
    items: FavoritesItem[];
}

export const INITIAL_FAVORITES_STATE: FavoritesState = {
    items: []
};

export function favoritesReducer(state: FavoritesState = INITIAL_FAVORITES_STATE, action: favoritesActions.Actions) {
    return produce(state, draftState => {
        switch (action.type) {
            case favoritesActions.FavoritesActionsTypes.ADD_FAVORITE:
                const item = (action as favoritesActions.AddFavoriteAction).payload;
                const provider = (action as favoritesActions.AddFavoriteAction).provider;
                const id = state.items.length + 1;
                draftState.items.push({id, name: item.name, provider, comment: ''});
                return;

            case favoritesActions.FavoritesActionsTypes.RESET_FAVORITES:
                draftState.items = [];
                return;
        }
    });
}
