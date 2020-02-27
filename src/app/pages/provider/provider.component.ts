import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/index';
import {CoreState} from '../../store/reducers';
import * as providerActions from './store/provider.action';
import * as favoritesActions from '../favorites/store/favorites.action';
import {Provider, PROVIDER_COLUMNS} from '../../services/provider.config';
import {Item} from './model/item.model';
import {ProviderState} from './store/provider.reducer';

export interface ProviderChoice {
    value: Provider;
    label: string;
}

@Component({
    selector: 'app-provider',
    templateUrl: './provider.component.html',
    styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnInit, OnDestroy, AfterViewInit {

    providers: ProviderChoice[] = [
        {value: 'countries', label: 'Countries'},
        {value: 'wiki', label: 'Wiki'},
    ];

    items: Item[];
    provider: Provider;
    okState: boolean;
    provider$: Observable<ProviderState>;
    displayedColumns = ['select'];
    dataSource: MatTableDataSource<Item>;
    initialSelection = [];
    allowMultiSelect = true;
    selection;

    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(private store: Store<CoreState>) {
        this.selection = new SelectionModel<Item>(this.allowMultiSelect, this.initialSelection);
    }

    ngOnInit() {
        this.provider$ = this.store.select(state => state.provider);
        this.provider$.subscribe(providerState => {
            this.provider = providerState.provider;
            this.displayedColumns = this.provider ? [...PROVIDER_COLUMNS[this.provider]] : [];
            this.okState = providerState.okState;
            this.items = providerState.okState ? providerState.items : [];
            this.dataSource = new MatTableDataSource(this.items);
            this.dataSource.sort = this.sort;
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    ngOnDestroy() {
        this.store.dispatch(new providerActions.ResetProviderAction());
    }

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
          this.selection.clear() :
          this.dataSource.data.forEach(row => {
              this.selection.select(row);
              this.store.dispatch(new favoritesActions.AddFavoriteAction(row, this.provider));
          });
    }

    setProvider(event) {
        this.provider = event.value;
    }

    fetchItems() {
        this.store.dispatch(new providerActions.SetProviderAction(this.provider));
        this.store.dispatch(new providerActions.FetchItemsAction(this.provider));
    }

    onChangeSelectionRow(row, event) {
        this.selection.toggle(row);
        if (event.checked) {
            this.store.dispatch(new favoritesActions.AddFavoriteAction(row, this.provider));
        }
    }
}
