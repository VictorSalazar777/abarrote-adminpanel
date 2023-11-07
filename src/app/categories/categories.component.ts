import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../model/category';
import { CreateCategoryDialogComponent } from '../create-category-dialog/create-category-dialog.component';
import { DeleteCategoryDialogComponent } from '../delete-category-dialog/delete-category-dialog.component';
import { UpdateCategoryDialogComponent } from '../update-category-dialog/update-category-dialog.component';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, 
     MatDialogModule, NgIf, MatCardModule],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CategoriesComponent {

  categoriesService: CategoriesService = inject(CategoriesService);
  displayedColumns: string[] = ['id', 'name', 'expand'];
  dataSource: Category[] = [];
  expandedElement:  Category | null = null;

  constructor(public dialog: MatDialog) {
    this.categoriesService.getAllCategories()
      .subscribe(categories => this.dataSource = categories)
  }

  showCreateCategoryDialog() {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, { data: { id: 0, name: '' } });

    dialogRef.afterClosed().subscribe(result => {

      if (result !== undefined) {
        var category = (result as Category)
        if (category.name.trim() !== '') {
          console.log('Data received');
          this.categoriesService.createCategory(category).subscribe({
            next: response =>  { 
              console.log('category created');              
            },
          });
        } else {
          console.log('Empty data');
        }
      } else {
        console.log('The dialog was closed');
      }

    });
  }

  showUpdateCategoryDialog(id: number) {
    const dialogRef = this.dialog.open(UpdateCategoryDialogComponent, { data: { id: 0, name: '' } })

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        var category = (result as Category);
        if (category.name.trim() !== '') {
          this.categoriesService.updateCategory(id, category).subscribe({
            next: response =>  { 
              console.log('category updated');              
            },
          });
        }
      }
    })
  }

  showDeleteCategoryDialog(id: number) {
    const dialogRef = this.dialog.open(DeleteCategoryDialogComponent)

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        var flag = (result as Boolean);
        if (flag) {
          this.categoriesService.deleteCategory(id).subscribe({
            next: response =>  { 
              console.log(`category deleted`);              
            },
          });
        }
      }
    });
  }

}
