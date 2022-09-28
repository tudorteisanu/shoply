import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ProductFilter',
  templateUrl: './product-filter.component.html',
})
export class ProductFilterComponent implements OnInit {
  categories: any[] = [
    {
      name: 'Electronic',
      value: 1,
      checked: true,
    },
    {
      name: 'Jewellery',
      value: 2,
    },
    {
      name: 'Women’s Clothing',
      value: 3,
    },
    {
      name: 'Men’s Clothing',
      value: 4,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
