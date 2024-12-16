import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesComponent } from '../components/categories/categories.component';
import { RatingComponent } from '../components/rating/rating.component';
import { CommonModule } from '@angular/common';
import { Product } from '../../admin/interfaces/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../admin/service/product.service';

@Component({
  selector: 'app-user',
  imports: [CommonModule, CategoriesComponent, RatingComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit, OnDestroy {
  #productService = inject(ProductService);
  #sub!: Subscription;

  categories: any[] = [];
  products: Product[] = [];
  selectedCategory: string | null = null;
  ngOnInit(): void {
    this.getCategories();
    this.getProducts;
  }

  getCategories(): void {
    this.#sub = this.#productService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  onCategorySelected(category: string): void {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
      this.getProducts();
      return;
    }

    this.selectedCategory = category;
    this.getProductsByCategory(category);
  }

  getProductsByCategory(category: string): void {
    this.#sub = this.#productService.getProductsByCategory(category).subscribe({
      next: (products) => {
        this.updateProductList(products);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getProducts(): void {
    this.#sub = this.#productService.getProducts().subscribe((data) => {
      this.products = data;
      this.updateProductList(data);
    });
  }

  updateProductList(products: Product[]): void {
    this.products = products;
  }

  ngOnDestroy(): void {
    this.#sub?.unsubscribe();
  }
}
