import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { User } from '../../core/interfaces/user.interface';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  readonly #router = inject(Router);
  readonly #translateService = inject(TranslateService);
  readonly #snackBar = inject(MatSnackBar);
  readonly #fb = inject(FormBuilder);
  readonly #authService = inject(AuthService);

  loginForm!: FormGroup;
  users: User[] = [
    { userName: 'user', password: 'user', role: 'user' },
    { userName: 'admin', password: 'admin', role: 'admin' },
  ];

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.#fb.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user = this.users.find(
        (user) =>
          user.userName === this.loginForm.get('userName')?.value &&
          user.password === this.loginForm.get('password')?.value
      );
      if (user) {
        this.#authService.login(user);
        this.#router.navigate([
          user.role === 'admin' ? '/admin-page' : '/user-page',
        ]);
      } else {
        this.#snackBar.open(
          this.#translateService.instant('loginPage.invalidData'),
          'OK',
          {
            duration: 2000,
          }
        );
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
