import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locales, LocalstorageKeys } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(private translate: TranslateService) {}

  get currentLang(): Locales {
    return this.translate.currentLang as Locales;
  }

  get allowedLocales(): Array<Locales> {
    return Object.values(Locales);
  }

  get browserLanguage(): Locales | undefined {
    const locale = this.translate.getBrowserLang() as Locales;

    if (this.allowedLocales.includes(locale)) {
      return locale;
    }

    return undefined;
  }

  get localStorageLocale(): Locales | undefined {
    const localStorageLocale = localStorage.getItem(
      LocalstorageKeys.Locale
    ) as Locales;

    if (this.allowedLocales.includes(localStorageLocale)) {
      return localStorage.getItem(LocalstorageKeys.Locale) as Locales;
    }

    return undefined;
  }

  changeLanguage(locale: Locales): void {
    if (locale === this.currentLang) {
      return;
    }

    this.translate.use(locale);
    localStorage.setItem(LocalstorageKeys.Locale, locale);
  }

  checkDefaultLocale(): void {
    if (this.localStorageLocale) {
      this.translate.use(this.localStorageLocale);
      return;
    }

    if (this.browserLanguage) {
      this.translate.use(this.browserLanguage);
      return;
    }
  }

  t(rawKey: string): string {
    return this.translate.instant(rawKey);
  }
}
