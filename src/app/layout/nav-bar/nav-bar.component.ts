import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { TranslationService } from '../../core/services/utilites/translation.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    TranslateModule,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  readonly #router = inject(Router);
  readonly authService = inject(AuthService);
  readonly #translatorService = inject(TranslationService);

  currentLang!: string;

  ngOnInit(): void {
    this.#translatorService.initLanguage();
    this.currentLang = this.#translatorService['translateService'].currentLang;
  }

  logout(): void {
    this.authService.logout();
    this.#router.navigate(['/']);
  }

  switchLanguage() {
    this.#translatorService.switchLanguage();
    this.currentLang = this.#translatorService['translateService'].currentLang;
  }
}
