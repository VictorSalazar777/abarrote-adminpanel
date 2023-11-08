import {Component, Inject} from '@angular/core';
import {ProductReport} from "../model/productreport";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgForOf} from "@angular/common";


export interface UpdateProductReportData {
  productReport: ProductReport,
  productName: String,
  categoryName: String
}

@Component({
  selector: 'app-update-product-report-dialog',
  templateUrl: './update-product-report-dialog.component.html',
  styleUrls: ['./update-product-report-dialog.component.css'],
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    NgForOf
  ],
  standalone: true
})
export class UpdateProductReportDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UpdateProductReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: UpdateProductReportData
  ) {
  }

  cancel() {
    this.dialogRef.close();
  }

}
