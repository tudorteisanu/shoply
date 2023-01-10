import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { RequestLoadingState } from '@/app/store/request-loading/request-loading.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'RequestLoader',
  templateUrl: './request-loader.component.html',
  styleUrls: ['./request-loader.component.css'],
})
export class RequestLoaderComponent {
  @Select(RequestLoadingState.getState)
  show: Observable<boolean>;
}
