import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { PartnersComponent } from './partners/partners.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { BenefitsComponent } from './benefits/benefits.component';

@NgModule({
  declarations: [HeroComponent, PartnersComponent, HomeProductComponent, BenefitsComponent],
  imports: [CommonModule],
  exports: [HeroComponent, PartnersComponent, HomeProductComponent, BenefitsComponent],
})
export class HomeComponentsModule {}
