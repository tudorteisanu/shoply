import { Component, Input } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';

@Component({
  selector: 'Breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styles: [],
})
export class BreadcrumbComponent {
  @Input() items: LinkInterface[] = [];
}
