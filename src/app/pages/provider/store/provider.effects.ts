import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import {Action} from '@ngrx/store';
import * as providerActions from './provider.action';
import {ProviderService} from '../../../services/provider.service';

@Injectable()
export class ProviderEffects {

    @Effect()
    fetchIems$: Observable<Action> = this.actions$.pipe(
      ofType<providerActions.FetchItemsAction>(providerActions.ProviderActionsTypes.FETCH_ITEMS),
      switchMap(action => {
          return this.providerService.getItems(action.payload).pipe(
            switchMap(response => {
                return of(new providerActions.SetItemsAction(action.payload === 'wiki' ? response.query.allimages : response.slice(0, 50)));
            }),
            catchError(() => {
                return of(new providerActions.ErrorFetchAction());
            })
          );
      })
    );

    constructor(private actions$: Actions,
                private providerService: ProviderService) {
    }

}
