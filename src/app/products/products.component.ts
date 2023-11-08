import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {ProductsService} from '../services/products.service';
import {CategoriesService} from '../services/categories.service';
import {Product} from '../model/product';
import {CreateProductDialogComponent,} from '../create-product-dialog/create-product-dialog.component';
import {UpdateProductDialogComponent} from '../update-product-dialog/update-product-dialog.component';
import {SimpleMessageDialogComponent} from "../simple-message-dialog/simple-message-dialog.component";
import {DeleteProductDialogComponent} from "../delete-product-dialog/delete-product-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";

export interface ProductInfo {
  id: number,
  categoryId: number,
  name: string,
  categoryName: string,
  price: number,
}

@Component({
  selector: 'app-products',
  styleUrls: ['products.component.css'],
  templateUrl: 'products.component.html',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule,
    MatDialogModule, NgIf, MatCardModule, MatMenuModule],
})
export class ProductsComponent {

  productsService: ProductsService = inject(ProductsService);
  categoriesService: CategoriesService = inject(CategoriesService);
  displayedColumns: string[] = ['id', 'categoryName', 'name', 'price', 'options'];
  dataSource: ProductInfo[] = [];

  constructor(public dialog: MatDialog) {

    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        if (categories.length == 0) {
          this.showNoCategoriesFoundDialog();
          return;
        }

        let categoriesMap = new Map<number, string>();
        categories.forEach(category => {
          categoriesMap.set(category.id, category.name);
        });
        this.productsService.getAllProducts()
          .subscribe(products => {
            let myProductsInfo: ProductInfo[] = [];
            products.forEach(product => {
                let productInfo: ProductInfo = {
                  id: product.id, categoryId: product.categoryId,
                  name: product.name, categoryName: categoriesMap.get(product.categoryId) ?? '',
                  price: product.price
                };
                myProductsInfo.push(productInfo);
              }
            )
            this.dataSource = myProductsInfo;

          });
      }
    });

  }

  showCreateProductDialog() {

    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {

        if (categories.length == 0) {
          this.showNoCategoriesFoundDialog();
          return;
        }

        const dialogRef = this.dialog.open(CreateProductDialogComponent, {data: categories});

        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined) {
              var product = (result as Product)
              if (product.name.trim() !== '' && product.categoryId !== 0) {
                this.productsService.createProduct(product).subscribe({
                  next: response => {
                    console.log('product created');
                  },
                });
              } else {
                console.log('Empty data');
              }
            } else {
              console.log('The dialog was closed');
            }
          }
        );
      }
    });
  }


  showUpdateProductDialog(id: number) {
    this.productsService.getProductById(id).subscribe({
        next: (product) => {
          this.categoriesService.getAllCategories().subscribe({
            next: (categories) => {
              if (categories.length == 0) {
                this.showNoCategoriesFoundDialog();
                return;
              }

              const dialogRef = this.dialog.open(UpdateProductDialogComponent, {
                data: {
                  product: product,
                  categories: categories
                }
              });

              dialogRef.afterClosed().subscribe(result => {
                if (result !== undefined) {
                  let updatedProduct = (result as Product);
                  this.productsService.updateProduct(updatedProduct.id, updatedProduct).subscribe({
                    next: (product: Product) => {
                      console.log(product);
                    },
                    error: (e: HttpErrorResponse) => {
                      this.showErrorDialog(e);
                    },
                  });
                }
              });

            },
            error: (e: HttpErrorResponse) => {
              this.showErrorDialog(e);
            },
          });

        },
        error: (e: HttpErrorResponse) => {
          this.showErrorDialog(e);
          return;
        },
        complete: () => console.log('')
      }
    );

  }

  showDeleteProductDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent)

    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result !== undefined) {
          const flag = (result as Boolean);
          if (flag) {
            this.productsService.deleteProduct(id).subscribe({
              next: response => {
                console.log(`product deleted`);
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
