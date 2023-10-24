import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { PeriodicElement } from '../services/periodicelement';
import {MatTableModule} from '@angular/material/table';


@Component({
  selector: 'app-products',
  styleUrls: ['products.component.css'],
  templateUrl: 'products.component.html',
  standalone: true,
  imports: [MatTableModule, CommonModule],
})
export class ProductsComponent {

  productsService: ProductsService = inject(ProductsService)
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: PeriodicElement[] = []

  constructor() {
    this.productsService.getProducts().then((products: PeriodicElement[])=>
      this.dataSource = products
    )
  }

}
