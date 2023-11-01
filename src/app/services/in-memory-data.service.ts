import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    createDb(){

    const products: Product[] = [
      {id: 1, name: "leche", categoryId: 1},
      {id: 2, name: "carne", categoryId: 2},

    ]; 

    return {products};
    
  }
}
