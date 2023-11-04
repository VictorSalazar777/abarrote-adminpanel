import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { Category } from '../model/category';


@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule]
})
export class CreateCategoryDialogComponent {

  constructor (
    public dialogRef: MatDialogRef<CreateCategoryDialogComponent>, 
      @Inject(MAT_DIALOG_DATA) public data: Category
  ) {}

  cancel() {
    this.dialogRef.close();
  }

}
