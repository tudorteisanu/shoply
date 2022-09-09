import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { PartnersComponent } from './partners/partners.component';

@NgModule({
  declarations: [HeroComponent, PartnersComponent],
  imports: [CommonModule],
  exports: [HeroComponent, PartnersComponent],
})
export class HomeComponentsModule {}
