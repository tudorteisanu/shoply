import { Component, OnInit } from '@angular/core';
import { ServiceInterface } from '@/ts/interfaces';

@Component({
  selector: 'Benefits',
  templateUrl: './benefits.component.html',
  styles: [],
})
export class BenefitsComponent implements OnInit {
  services: ServiceInterface[] = [
    {
      icon: 'assets/icons/service-1.svg',
      title: 'Best Quality',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur, purus id ',
    },
    {
      icon: 'assets/icons/service-2.svg',
      title: 'Free Shipping',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur, purus id ',
    },
    {
      icon: 'assets/icons/service-3.svg',
      title: 'Warranty',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur, purus id ',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
