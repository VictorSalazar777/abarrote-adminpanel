import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {ProductReportsService} from '../services/product-reports.service';
import {ProductReport} from '../model/productreport';
import {SimpleMessageDialogComponent} from "../simple-message-dialog/simple-message-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {
  DeleteProductReportDialogComponent
} from "../delete-product-report-dialog/delete-product-report-dialog.component";
import {ProductsService} from "../services/products.service";
import {CategoriesService} from "../services/categories.service";
import {
  UpdateProductReportDialogComponent
} from "../update-product-report-dialog/update-product-report-dialog.component";

@Component({
  selector: 'app-productreports',
  templateUrl: './product-reports.component.html',
  styleUrls: ['./product-reports.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, NgIf, MatCardModule, MatMenuModule],
})
export class ProductReportsComponent {

  productReportService: ProductReportsService = inject(ProductReportsService);
  productsService: ProductsService = inject(ProductsService);
  categoryService: CategoriesService = inject(CategoriesService);
  displayedColumns: string[] = ['id', 'productId', 'price', 'oldPrice', 'expirationDate', 'options'];
  dataSource: ProductReport[] = []

  constructor(public dialog: MatDialog) {

    this.productReportService.getAllProductReports()
      .subscribe(productReports => this.dataSource = productReports)
  }

  showCreateProductReportDialog() {

  }

  showUpdateProductReportDialog(id: number) {

    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {

        if (categories.length == 0) {
          this.showNoCategoriesFoundDialog();
          return;
        }

        this.productsService.getAllProducts().subscribe({
          next: (products) => {
            if (products.length == 0) {
              this.showNoProductsFoundDialog();
              return;
            }

            this.productReportService.getProductReportById(id).subscribe({
              next: (productReports) => {
                let dialogRef = this.dialog.open(UpdateProductReportDialogComponent, {});

              },
              error: (e: HttpErrorResponse) => {
                this.showErrorDialog(e);
                return;
              },
            });

          },
          error: (e: HttpErrorResponse) => {
            this.showErrorDialog(e);
            return;
          },
        });
      },
      error: (e: HttpErrorResponse) => {
        this.showErrorDialog(e);
        return;
      },
    });


  }

  showDeleteProductReportDialog(id: number) {

    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        if (products.length == 0) {
          this.showNoProductsFoundDialog();
          return;
        }

        const dialogRef = this.dialog.open(DeleteProductReportDialogComponent);
        dialogRef.afterClosed().subscribe({
          next: result => {
            if (result !== undefined) {
              const flag = (result as Boolean);
              if (flag) {
                this.productReportService.deleteProductReport(id).subscribe({
                  next: response => {
                    console.log(`product report deleted`);
                  },
                });
              }
            }
          },
          error: (e: HttpErrorResponse) => {
            this.showErrorDialog(e);
            return;
          },
        });
      },
      error: (e: HttpErrorResponse) => {
        this.showErrorDialog(e);
        return;
      },
    });
  }

  showCantLoadCategoriesMessageDialog() {
    this.dialog.open(SimpleMessageDialogComponent, {data: 'No se pudo cargar categorías'});
  }

  showNoCategoriesFoundDialog() {
    this.dialog.open(SimpleMessageDialogComponent, {data: 'No hay categorías!!'});
  }

  showNoProductsFoundDialog() {
    this.dialog.open(SimpleMessageDialogComponent, {data: 'No hay productos!!'});
  }

  showErrorDialog(e: HttpErrorResponse) {
    this.dialog.open(SimpleMessageDialogComponent, {data: `Error: ${e.message}`});
  }

}
