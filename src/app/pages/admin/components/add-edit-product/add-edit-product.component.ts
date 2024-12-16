import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-add-edit-product',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './add-edit-product.component.html',
  styleUrl: './add-edit-product.component.scss',
})
export class AddEditProductComponent {
  readonly #fb = inject(FormBuilder);
  readonly #productService = inject(ProductService);
  readonly #dialogRef = inject(MatDialogRef<AddEditProductComponent>);

  productForm!: FormGroup;
  categories: string[] = [
    `men's clothing	`,
    'electronics',
    'jewelery',
    `women's clothing	`,
  ];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.productForm = this.#fb.group({
      title: [
        this.data.isEdit ? this.data.product.title : '',
        Validators.required,
      ],
      price: [
        this.data.isEdit ? this.data.product.price : '',
        Validators.required,
      ],
      description: [
        this.data.isEdit ? this.data.product.description : '',
        Validators.required,
      ],
      category: [
        this.data.isEdit
          ? this.categories.find(
              (category) => category === this.data.product.category
            )
          : '',
        Validators.required,
      ],
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      if (this.data.isEdit) {
        this.#productService
          .updateProduct(this.productForm.value)
          .subscribe(() => {
            this.#dialogRef.close(true);
          });
      } else {
        this.#productService
          .addProduct(this.productForm.value)
          .subscribe(() => {
            this.#dialogRef.close(true);
          });
      }
    } else {
      this.productForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.#dialogRef.close();
  }
}
