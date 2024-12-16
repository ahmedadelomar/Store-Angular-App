import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly #httpClient = inject(HttpClient);
  readonly #baseUrl = environment.baseUrl;

  getProducts(): Observable<Product[]> {
    return this.#httpClient
      .get<Product[]>(this.#baseUrl)
      .pipe(catchError(this.handleError));
  }

  addProduct(product: Product): Observable<Product> {
    return this.#httpClient
      .post<Product>(this.#baseUrl, product)
      .pipe(catchError(this.handleError));
  }

  updateProduct(product: Product): Observable<Product> {
    return this.#httpClient
      .put<Product>(`${this.#baseUrl}/${product.id}`, product)
      .pipe(catchError(this.handleError));
  }

  deleteProduct(product: Product): Observable<void> {
    return this.#httpClient
      .delete<void>(`${this.#baseUrl}/${product.id}`)
      .pipe(catchError(this.handleError));
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.#httpClient
      .get<Product[]>(`${this.#baseUrl}/category/${category}`)
      .pipe(catchError(this.handleError));
  }

  getCategories(): Observable<any[]> {  // sorry for making the type is any but i don't the interface
    return this.#httpClient.get<any[]>(`${this.#baseUrl}/categories`);
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);

    return throwError(() => new Error(errorMessage));
  }
}
