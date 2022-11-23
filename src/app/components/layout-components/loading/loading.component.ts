import { Component, OnInit } from '@angular/core';
import { LoadingService } from '@/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [],
})
export class LoadingComponent implements OnInit {
  show: Observable<boolean>;

  constructor(private loading: LoadingService) {
    this.show = loading.state;
  }

  ngOnInit(): void {}
}
