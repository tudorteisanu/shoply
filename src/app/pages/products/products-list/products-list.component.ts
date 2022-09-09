import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class ProductsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
