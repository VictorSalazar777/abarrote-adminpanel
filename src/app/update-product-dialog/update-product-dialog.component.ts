import {Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../model/category';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgFor} from "@angular/common";


export interface UpdateProductDialogData {
  productName: string,
  selectedCategoryId: number
}

@Component({
  selector: 'app-update-product-dialog',
  templateUrl: './update-product-dialog.component.html',
  styleUrls: ['./update-product-dialog.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, NgFor],
})
export class UpdateProductDialogComponent {

  public output: UpdateProductDialogData = {productName: '', selectedCategoryId: 0}


  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public categories: Category[] | undefined
  ) {
  }

  cancel() {
    this.dialogRef.close();
  }
}
