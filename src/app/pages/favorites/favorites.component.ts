import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import {MatSort, MatTableDataSource, MatDialog, MatDialogConfig} from '@angular/material';
import {CoreState} from '../../store/reducers';
import {FavoritesState} from './store/favorites.reducer';
import {FavoritesItem} from './model/favorites.model';
import {ChangeCommentComponent} from './change-comment/change-comment.component';
import * as favoritesActions from '../favorites/store/favorites.action';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, AfterViewInit {

    favorites$: Observable<FavoritesState>;
    items: FavoritesItem[];
    displayedColumns = ['name', 'provider', 'comment', 'changeComment'];
    dataSource: MatTableDataSource<FavoritesItem>;

    @ViewChild(MatSort, {static: false}) sort: MatSort;

    constructor(private store: Store<CoreState>, private dialog: MatDialog) {
    }

    ngOnInit() {
        this.favorites$ = this.store.select(state => state.favorites);
        this.favorites$.subscribe(favoritesState => {
            this.items = favoritesState.items;
            this.dataSource = new MatTableDataSource(this.items);
        });
    }

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
    }

    openDialog(item) {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = item;

        const dialogRef = this.dialog.open(ChangeCommentComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
          data => {
              if (data) {
                  item.comment = data.comment;
              }
          }
        );
    }

    removeFavorites() {
        this.store.dispatch(new favoritesActions.ResetFavoritesAction());
    }
}
