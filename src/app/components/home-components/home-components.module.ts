import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from './hero/hero.component';
import { PartnersComponent } from './partners/partners.component';
import { HomeProductComponent } from './home-product/home-product.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { HomeFeedbackComponent } from './home-feedback/home-feedback.component';
import { ProductComponentsModule } from '@/components/product-components/product-components.module';

@NgModule({
  declarations: [
    HeroComponent,
    PartnersComponent,
    HomeProductComponent,
    BenefitsComponent,
    HomeFeedbackComponent,
  ],
  imports: [CommonModule, ProductComponentsModule],
  exports: [
    HeroComponent,
    PartnersComponent,
    HomeProductComponent,
    BenefitsComponent,
    HomeFeedbackComponent,
  ],
})
export class HomeComponentsModule {}
