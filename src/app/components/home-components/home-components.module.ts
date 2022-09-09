import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { PartnersComponent } from './partners/partners.component';
import { HomeProductComponent } from './home-product/home-product.component';

@NgModule({
  declarations: [HeroComponent, PartnersComponent, HomeProductComponent],
  imports: [CommonModule],
  exports: [HeroComponent, PartnersComponent, HomeProductComponent],
})
export class HomeComponentsModule {}
