import { Injectable } from '@angular/core';
import { PeriodicElement } from './periodicelement';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  url = 'http://localhost:3000/products';


  async getProducts(): Promise<PeriodicElement[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

}
