import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private htmlTag = document.getElementsByTagName('html')[0] as HTMLHtmlElement;

  constructor(private translateService: TranslateService) {}

  initLanguage(): void {
    const dir = localStorage.getItem('dir') || 'ltr';
    const lang = this.translateService.getBrowserLang() || 'en';

    if (dir === 'ltr') {
      this.setLanguage('en', 'ltr');
    } else {
      this.setLanguage('ar', 'rtl');
    }
  }

  switchLanguage(): void {
    const currentLang = this.translateService.currentLang === 'en' ? 'ar' : 'en';
    const dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    this.setLanguage(currentLang, dir);
  }

  private setLanguage(lang: string, dir: string): void {
    this.translateService.use(lang);
    this.translateService.setDefaultLang(lang);
    this.htmlTag.lang = lang;
    this.htmlTag.dir = dir;
    localStorage.setItem('dir', dir);
  }
}
