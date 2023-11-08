import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {catchError, Observable, of} from 'rxjs';
import {ProductReport} from '../model/productreport';

@Injectable({
  providedIn: 'root'
})
export class ProductReportsService {

  private productReportsUrl = 'http://localhost:8080/abarrote/product-report';

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
    return this.http.get<ProductReport[]>(this.productReportsUrl)
      .pipe(
        catchError(this.handleError<ProductReport[]>('getAllProductReports', []))
      );
  }

  getProductReportById(id: number): Observable<ProductReport> {
    const url = `${this.productReportsUrl}/${id}`;
    return this.http.get<ProductReport>(url).pipe(
      catchError(this.handleError<ProductReport>(`getProductReportById id = ${id}`))
    );
  }

  createProductReport(productReport: ProductReport): Observable<ProductReport> {
    return this.http.post<ProductReport>(this.productReportsUrl, productReport)
      .pipe(
        catchError(this.handleError<ProductReport>('createProductReport'))
      )
  }

  updateProductReport(id: number, productReport: ProductReport): Observable<ProductReport> {
    const url = `${this.productReportsUrl}/${id}`;
    return this.http.put<ProductReport>(url, productReport).pipe(
      catchError(this.handleError<ProductReport>(`updateProductReport id = ${id}`))
    );
  }

  deleteProductReport(id: number): Observable<String> {
    const url = `${this.productReportsUrl}/${id}`;
    return this.http.delete<String>(url).pipe(
      catchError(this.handleError<String>(`deleteProductReport id = ${id}`))
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
