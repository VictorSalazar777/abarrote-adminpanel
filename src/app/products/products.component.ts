import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
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
  dataSource = this.productsService.ELEMENT_DATA;
}
