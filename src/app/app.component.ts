import { Component } from '@angular/core';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ProductsComponent, RouterModule, HeaderComponent],
})
export class AppComponent {
  title = 'adminpanel';

  
}
