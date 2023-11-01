import { Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductreportsComponent } from './productreports/productreports.component';

const routes: Routes = [
{ path: 'products', component: ProductsComponent, title: 'Productos' },
{ path: 'categories', component: CategoriesComponent, title: 'Categorías'},
{ path: 'productreports', component: ProductreportsComponent, title: 'Reportes' },
{ path: '', pathMatch: 'full', redirectTo: 'products' },
{ path: '**', redirectTo: 'productreports' }
];


export default routes;
