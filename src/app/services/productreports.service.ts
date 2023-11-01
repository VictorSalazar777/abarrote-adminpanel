import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { ProductReport } from '../model/productreport';

@Injectable({
  providedIn: 'root'
})
export class ProductreportsService {

  private productsUrl = 'http://localhost:8080/abarrote/productreports'; 

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getAllProductReports();
  }

  private log(message: string) {
    this.messageService.add(`ProductReportsService: ${message}`);
  }

  getAllProductReports(): Observable<ProductReport[]> {
    return this.http.get<ProductReport[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<ProductReport[]>('getProducts', []))
      );
  }

  getProductReportById(id: number): Observable<ProductReport> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<ProductReport>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<ProductReport>(`getProduct id = ${id}`))
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
