import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'FormInput',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form-input.component.html',
})
export class FormInputComponent implements OnInit {
  @Input() icon: string | undefined = undefined;
  @Input() type: string = 'text';
  @Input() control: FormControl = new FormControl('');

  constructor() {}

  get errors(): any {
    return this.control.errors
  }

  get errorMessage(): string {
    const messages = [];

    if (!this.errors) {
      return ''
    }

    if (this.errors.hasOwnProperty('required')) {
      messages.push('This is required field')
    }

    if (this.errors.hasOwnProperty('email')) {
      messages.push('Invalid email format')
    }

    if (this.errors.hasOwnProperty('minlength')) {
      messages.push(`Minimal length is ${this.errors.minlength.requiredLength} (${this.errors.minlength.actualLength})`)
    }

    if (this.errors.hasOwnProperty('maxlength')) {
      messages.push(`Minimal length is ${this.errors.maxlength.requiredLength} (${this.errors.maxlength.actualLength})`)
    }

      return messages.join(', ')
  }

  get areMessageShown(): boolean {
    return  this.control.touched || this.control.dirty
  }

  ngOnInit(): void {}
}
