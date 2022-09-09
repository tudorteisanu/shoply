import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'Partners',
  templateUrl: './partners.component.html',
  styles: [
  ]
})
export class PartnersComponent implements OnInit {
  readonly partners = [
    'assets/images/jp-morgan-1.png',
    'assets/images/oysho-1.png',
    'assets/images/pull-bear-2.png',
    'assets/images/rose-wood.png',
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
