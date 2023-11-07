import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {MessageService} from './message.service';
import {catchError, Observable, of} from 'rxjs';
import {Category} from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categoriesUrl = 'http://localhost:8080/abarrote/categories';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  private log(message: string) {
    this.messageService.add(`CategoriesService: ${message}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  getCategoryById(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url).pipe(
      catchError(this.handleError<Category>(`getCategoryById id = ${id}`))
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category)
      .pipe(
        catchError(this.handleError<Category>('createCategory'))
      )
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.put<Category>(url, category).pipe(
      catchError(this.handleError<Category>(`updateCategory id = ${id}`))
    );
  }

  deleteCategory(id: number): Observable<String> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.delete<String>(url).pipe(
      catchError(this.handleError<String>(`deleteCategory id = ${id}`))
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

      console.error('Hubo un error!')

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
