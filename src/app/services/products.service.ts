import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MessageService} from './message.service';
import {Observable} from 'rxjs';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {

  private productsUrl = 'http://localhost:8080/abarrote/products';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  private log(message: string) {
    this.messageService.add(`ProductsService: ${message}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl);
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.put<Product>(url, product);
  }

  deleteProduct(id: number): Observable<String> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<String>(url);
  }

}
