import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutComponentsModule } from '@/components/layout-components/layout-components.module';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LayoutComponentsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
