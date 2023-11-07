import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
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
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        catchError(this.handleError<Product[]>('getAllProducts', []))
      );
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      catchError(this.handleError<Product>(`getProductById id = ${id}`))
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product)
      .pipe(
        catchError(this.handleError<Product>('createProduct'))
      )
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.put<Product>(url, product).pipe(
      catchError(this.handleError<Product>(`updateProduct id = ${id}`))
    );
  }

  deleteProduct(id: number): Observable<String> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<String>(url).pipe(
      catchError(this.handleError<String>(`deleteProduct id = ${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
