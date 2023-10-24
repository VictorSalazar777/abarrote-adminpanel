import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductshttpService } from '../services/productshttp.service';
import { Product } from '../services/product';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-products',
  styleUrls: ['products.component.css'],
  templateUrl: 'products.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class ProductsComponent {

  productshttpService: ProductshttpService = inject(ProductshttpService)
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: Product[] = []

  constructor() {

    this.productshttpService.getProducts()
      .subscribe(products => this.dataSource = products)
  }

}
