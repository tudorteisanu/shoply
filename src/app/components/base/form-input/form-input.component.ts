import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'FormInput',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-input.component.html',
})
export class FormInputComponent implements OnInit {
  @Input() icon: string | undefined = undefined;
  @Input() type: string = 'text';

  constructor() {}

  ngOnInit(): void {}
}
