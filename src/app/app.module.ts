import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
    MatCheckboxModule,
    MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, MatSortModule,
    MatTableModule, MatButtonModule, MatRadioModule, MatDialogModule
} from '@angular/material';
import {StoreModule} from '@ngrx/store';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {STMS_ROUTES} from './app.routing';
import {FavoritesComponent} from './pages/favorites/favorites.component';
import {ProviderComponent} from './pages/provider/provider.component';
import {reducers} from './store/reducers';
import {providerReducer} from './pages/provider/store/provider.reducer';
import {ProviderEffects} from './pages/provider/store/provider.effects';
import {favoritesReducer} from './pages/favorites/store/favorites.reducer';
import {ChangeCommentComponent} from './pages/favorites/change-comment/change-comment.component';

@NgModule({
    declarations: [
        AppComponent,
        FavoritesComponent,
        ProviderComponent,
        ChangeCommentComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(STMS_ROUTES),
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatCheckboxModule,
        MatRadioModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        RouterModule.forRoot([]),
        StoreModule.forRoot(reducers),
        StoreModule.forFeature('provider', providerReducer),
        StoreModule.forFeature('favorites', favoritesReducer),
        EffectsModule.forFeature([ProviderEffects]),
        EffectsModule.forRoot([])
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ChangeCommentComponent]
})
export class AppModule {
}
