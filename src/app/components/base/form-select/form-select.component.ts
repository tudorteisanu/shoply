import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'FormSelect',
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent {
  @Input() control: FormControl = new FormControl('');
  @Input() items: any[] = [];
  @Input() label: string = '';

  areItemsVisible: boolean = false;

  get value() {
    return this.control.value;
  }

  get inputText() {
    const index = this.items.findIndex(
      (item) => item.value === Number(this.control.value)
    );

    if (index === -1) {
      return this.label;
    }

    return this.items[index].text;
  }

  selectItem(item: any): void {
    this.control.setValue(item.value);
    this.hideItems();
  }

  hideItems(): void {
    if (this.areItemsVisible) {
      this.areItemsVisible = false;
    }
  }

  showItems(): void {
    if (!this.areItemsVisible) {
      this.areItemsVisible = true;
    }
  }
}
