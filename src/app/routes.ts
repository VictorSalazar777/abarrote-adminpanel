import {Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {CategoriesComponent} from './categories/categories.component';
import {ProductReportsComponent} from './productreports/product-reports.component';

const routes: Routes = [
  {path: 'products', component: ProductsComponent, title: 'Productos'},
  {path: 'categories', component: CategoriesComponent, title: 'Categorías'},
  {path: 'productreports', component: ProductReportsComponent, title: 'Reportes'},
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: '**', redirectTo: 'productreports'}
];


export default routes;
