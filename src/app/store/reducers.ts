import {ActionReducerMap} from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromProvider from '../pages/provider/store/provider.reducer';
import * as fromFavorites from '../pages/favorites/store/favorites.reducer';

export interface CoreState {
    provider: fromProvider.ProviderState;
    favorites: fromFavorites.FavoritesState;
}

export const reducers: ActionReducerMap<any> = {
    router: fromRouter.routerReducer
};
