import { Component } from '@angular/core';
import { I18nService } from '@/app/plugins/i18n.service';
import { Locales } from '@/ts/enum';

@Component({
  selector: 'LanguageSwitcher',
  templateUrl: './language-switcher.component.html',
  styles: [],
})
export class LanguageSwitcherComponent {
  constructor(private i18n: I18nService) {}

  get languages(): Array<Locales> {
    return this.i18n.allowedLocales;
  }

  isActive(locale: Locales): boolean {
    return this.i18n.currentLang === locale;
  }

  languageClass(locale: Locales): string | null {
    if (this.isActive(locale)) {
      return 'bg-primary-900 text-white';
    }

    return null;
  }

  async changeLanguage(language: Locales): Promise<void> {
    this.i18n.changeLanguage(language);
  }
}
