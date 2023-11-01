import { Component, inject } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../model/category';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: true,
  imports: [MatTableModule]
})
export class CategoriesComponent {

  categoriesService: CategoriesService = inject(CategoriesService)
  displayedColumns: string[] = ['id', 'name']
  dataSource: Category[] = []

  constructor() {
    this.categoriesService.getAllCategories()
      .subscribe(categories => this.dataSource = categories )
  }
}
