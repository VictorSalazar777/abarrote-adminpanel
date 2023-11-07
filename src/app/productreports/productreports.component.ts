import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { ProductreportsService } from '../services/productreports.service';
import { ProductReport } from '../model/productreport';

@Component({
  selector: 'app-productreports',
  templateUrl: './productreports.component.html',
  styleUrls: ['./productreports.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, 
    MatDialogModule, NgIf, MatCardModule, MatMenuModule],
})
export class ProductreportsComponent {

  productReportService: ProductreportsService = inject(ProductreportsService)
  displayedColumns: string[] = ['id', 'productId', 'price', 'oldPrice', 'expirationDate', 'options'];
  dataSource: ProductReport[] = []

  constructor(public dialog: MatDialog) {

    this.productReportService.getAllProductReports()
      .subscribe(productReports => this.dataSource = productReports)
  }

  showCreateProductReportDialog() {
    
  }

  showUpdateProductReportDialog(id: number) {

  }

  showDeleteProductReportDialog(id: number) {

  }
  
}
