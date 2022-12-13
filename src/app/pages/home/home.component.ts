import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponentsModule } from '@/components/home-components/home-components.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HomeComponentsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
