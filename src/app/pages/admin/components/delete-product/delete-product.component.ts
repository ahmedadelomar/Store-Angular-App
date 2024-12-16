import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-delete-product',
  imports: [MatButtonModule, MatDialogModule, TranslateModule],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.scss',
})
export class DeleteProductComponent {
  readonly dialogRef = inject(MatDialogRef<DeleteProductComponent>);

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
