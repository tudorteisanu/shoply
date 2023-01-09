import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Locales, LocalstorageKeys } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  _translations: Record<string, any> = {};

  constructor(private translate: TranslateService) {
    this.checkDefaultLocale();
    this.loadTranslations();
  }

  get currentLang(): Locales {
    return this.translate.currentLang as Locales;
  }

  get defaultLang(): Locales {
    return this.translate.defaultLang as Locales;
  }

  get browserLanguage(): Locales | undefined {
    const locale = this.translate.getBrowserLang() as Locales;

    if (Object.values(Locales).includes(locale)) {
      return locale;
    }

    return undefined;
  }

  get localStorageLocale(): Locales | undefined {
    const localStorageLocale = localStorage.getItem(
      LocalstorageKeys.Locale
    ) as Locales;

    if (Object.values(Locales).includes(localStorageLocale)) {
      return localStorage.getItem(LocalstorageKeys.Locale) as Locales;
    }

    return undefined;
  }

  changeLanguage(locale: Locales): void {
    try {
      this.translate.use(locale);
      this.translate.currentLang = locale;
      localStorage.setItem(LocalstorageKeys.Locale, locale);
      this.loadTranslations();
    } catch (e) {
      this.loadDefaultTranslations();
    }
  }

  loadDefaultTranslations(): void {
    this.setTranslations(this.defaultLang);
  }

  loadTranslations(): void {
    if (this._translations.hasOwnProperty(this.currentLang)) {
      this.translate.setTranslation(
        this.currentLang,
        this._translations[this.currentLang]
      );

      return;
    }

    this.setTranslations(this.currentLang);
  }

  setTranslations(locale: Locales): void {
    import(`src/app/locales/${locale}`).then((translations) => {
      this.translate.setTranslation(locale, translations.default);
      this._translations[locale] = translations.default;
    });
  }

  checkDefaultLocale(): void {
    if (this.localStorageLocale) {
      this.translate.currentLang = this.localStorageLocale;
      return;
    }

    if (this.browserLanguage) {
      this.translate.currentLang = this.browserLanguage;
      return;
    }

    this.translate.currentLang = Locales.En;
  }
}
