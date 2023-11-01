import { Component, inject } from '@angular/core';
import { ProductreportsService } from '../services/productreports.service';
import { ProductReport } from '../model/productreport';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-productreports',
  templateUrl: './productreports.component.html',
  styleUrls: ['./productreports.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class ProductreportsComponent {

  productReportService: ProductreportsService = inject(ProductreportsService)
  displayedColumns: string[] = ['id', 'productId', 'price', 'oldPrice', 'expirationDate'];
  dataSource: ProductReport[] = []

  constructor() {

    this.productReportService.getAllProductReports()
      .subscribe(productReports => this.dataSource = productReports)
  }
}
