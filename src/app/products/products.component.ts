import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { Product } from '../model/product';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-products',
  styleUrls: ['products.component.css'],
  templateUrl: 'products.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class ProductsComponent {

  productsService: ProductsService = inject(ProductsService)
  displayedColumns: string[] = ['id', 'name', 'categoryId'];
  dataSource: Product[] = []

  constructor() {

    this.productsService.getAllProducts()
      .subscribe(products => this.dataSource = products)
  }

}
