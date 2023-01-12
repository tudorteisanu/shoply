import { Component, Input, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'FormSelect',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.css'],
})
export class FormSelectComponent implements ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() items: any[] = [];
  @Input() label: string = '';

  areItemsVisible: boolean = false;

  selectedItem: any = null;

  constructor(@Self() @Optional() private control: NgControl) {
    this.control.valueAccessor = this;
  }

  get value() {
    return this.control.value;
  }

  get inputText(): string {
    const index = this.items.findIndex(
      (item) => item.value === Number(this.control.value)
    );

    if (index === -1) {
      return this.label;
    }

    return this.items[index].text;
  }

  itemClass(item: any): string | Record<string, boolean> {
    return {
      selected: this.selectedItem?.value === item.value,
    };
  }

  selectItem(item: any): void {
    this.writeValue(item.value);
    this.selectedItem = item;
    this.hideItems();
  }

  hideItems(): void {
    if (this.areItemsVisible) {
      this.areItemsVisible = false;
    }
  }

  toggleShowItems(): void {
    this.areItemsVisible = !this.areItemsVisible;
  }

  selectPrevItem(): void {
    if (!this.selectedItem) {
      this.selectedItem = this.items[this.items.length - 1];
    }

    const index = this.items.findIndex(
      (item) => item.value === this.selectedItem.value
    );

    if (index !== -1) {
      if (!index) {
        this.selectedItem = this.items[this.items.length - 1];
      } else {
        this.selectedItem = this.items[index - 1];
      }
    }

    this.scrollIntoView();
  }

  selectNextItem(): void {
    if (!this.selectedItem) {
      this.selectedItem = this.items[0];
    }

    const index = this.items.findIndex(
      (item) => item.value === this.selectedItem.value
    );

    if (index !== -1) {
      if (index === this.items.length - 1) {
        this.selectedItem = this.items[0];
      } else {
        this.selectedItem = this.items[index + 1];
      }
    }

    this.scrollIntoView();
  }

  selectCurrentItem(): void {
    if (!this.areItemsVisible) {
      this.areItemsVisible = true;
      return;
    }

    if (!this.selectedItem) {
      return;
    }

    this.selectItem(this.selectedItem);
  }

  scrollIntoView() {
    const item = document.getElementById(this.selectedItem.value.toString());

    if (item) {
      item.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (value: any) => {};

  onTouched = () => {};
  writeValue(value: any): void {
    this.onChange(value);
  }

  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
