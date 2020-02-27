import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FavoritesItem} from '../model/favorites.model';


@Component({
    selector: 'change-comment',
    templateUrl: './change-comment.component.html'
})
export class ChangeCommentComponent implements OnInit {
    form: FormGroup;
    comment: string;
    name: string;

    constructor(private fb: FormBuilder,
                private dialogRef: MatDialogRef<ChangeCommentComponent>,
                @Inject(MAT_DIALOG_DATA) data: FavoritesItem) {
        this.comment = data.comment;
        this.name = data.name + ' (' + data.provider + ')';
        this.form = fb.group({
            comment: this.comment,
            name: this.name
        });
    }

    ngOnInit() {

    }

    save() {
        this.dialogRef.close(this.form.value);
    }

    close() {
        this.dialogRef.close();
    }
}