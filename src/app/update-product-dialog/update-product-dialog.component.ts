import {Component, Inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {Category} from '../model/category';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {NgFor} from "@angular/common";
import {Product} from "../model/product";


export interface UpdateProductDialogData {
  product: Product,
  categories: Category[]
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

  constructor(
    public dialogRef: MatDialogRef<UpdateProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: UpdateProductDialogData
  ) {
  }

  cancel() {
    this.dialogRef.close();
  }
}
