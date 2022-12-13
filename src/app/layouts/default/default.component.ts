import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponentsModule } from '@/components/layout-components/layout-components.module';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  standalone: true,
  imports: [CommonModule, LayoutComponentsModule, RouterOutlet],
})
export class DefaultComponent {}
