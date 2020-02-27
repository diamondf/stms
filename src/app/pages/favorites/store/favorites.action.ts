import {Action} from '@ngrx/store';
import {Item} from '../../provider/model/item.model';
import {Provider} from '../../../services/provider.config';

export enum FavoritesActionsTypes {
    ADD_FAVORITE = '[Favorites] Add Favorite',
    RESET_FAVORITES = '[Favorites] Reset Favorites',
}

export class AddFavoriteAction implements Action {
    readonly type = FavoritesActionsTypes.ADD_FAVORITE;

    constructor(public payload: Item, public provider: Provider) {
    }
}

export class ResetFavoritesAction implements Action {
    readonly type = FavoritesActionsTypes.RESET_FAVORITES;
}

export type Actions =
    AddFavoriteAction
  | ResetFavoritesAction;
