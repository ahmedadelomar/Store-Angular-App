import {
  AfterViewInit,
  Component,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductService } from '../service/product.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Product } from '../interfaces/product';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { AddEditProductComponent } from '../components/add-edit-product/add-edit-product.component';
import { DeleteProductComponent } from '../components/delete-product/delete-product.component';

@Component({
  selector: 'app-admin',
  imports: [
    MatSnackBarModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatPaginatorModule,
    TranslateModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  readonly #productService = inject(ProductService);
  readonly #snackBar = inject(MatSnackBar);
  readonly #translateService = inject(TranslateService);
  #sub!: Subscription;
  readonly #dialog = inject(MatDialog);

  products: Product[] = [];
  dataSource = new MatTableDataSource<Product>();
  displayedColumns: string[] = [
    'id',
    'title',
    'price',
    'category',
    'description',
    'actions',
  ];

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getProducts() {
    this.#sub = this.#productService.getProducts().subscribe((products) => {
      this.products = products;
      this.dataSource.data = products;
    });
  }

  onAddProduct(): void {
    const dialogRef = this.#dialog.open(AddEditProductComponent, {
      height: '400px',
      width: '600px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProducts();
        this.#snackBar.open(
          this.#translateService.instant('admin.productAdded'),
          'Ok',
          { duration: 2000 }
        );
      }
    });
  }

  onEditProduct(product: Product): void {
    const dialogRef = this.#dialog.open(AddEditProductComponent, {
      height: '400px',
      width: '600px',
      data: { isEdit: true, product },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getProducts();
        this.#snackBar.open(
          this.#translateService.instant('admin.productUpdated'),
          'Ok',
          { duration: 2000 }
        );
      }
    });
  }

  onDeleteProduct(product: Product): void {
    const dialogRef = this.#dialog.open(DeleteProductComponent, {
      height: '200px',
      width: '600px',
      data: product.title,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.#productService.deleteProduct(product).subscribe(() => {
          this.getProducts();
          this.#snackBar.open(
            this.#translateService.instant('admin.productDeleted'),
            'Close',
            { duration: 3000 }
          );
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.#sub.unsubscribe();
  }
}
