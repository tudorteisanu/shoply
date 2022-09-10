import { Component, Input, OnInit } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';

@Component({
  selector: 'Breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [],
})
export class BreadcrumbComponent implements OnInit {
  @Input() items: LinkInterface[] = [];

  constructor() {}

  ngOnInit(): void {}
}
