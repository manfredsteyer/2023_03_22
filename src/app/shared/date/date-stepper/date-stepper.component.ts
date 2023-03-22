import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addDays, subDays } from 'date-fns';
import { ControlValueAccessor, NgControl } from '@angular/forms';

type OnChange = (value: Date) => void;
type OnTouched = () => void;

@Component({
  selector: 'app-date-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-stepper.component.html',
  styleUrls: ['./date-stepper.component.css'],
})
export class DateStepperComponent implements ControlValueAccessor {
 
  _onChange: OnChange = () => {};
  _onTouched: OnTouched = () => {};

  ngControl = inject(NgControl);

  constructor() {
    this.ngControl.valueAccessor = this;
  }

  date = new Date();

  writeValue(obj: Date): void {
    this.date = obj;
  }

  registerOnChange(fn: OnChange): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: OnTouched): void {
    this._onTouched = fn;
  }
 

  next(): void {
    this.date = addDays(this.date, 1);
    this._onChange(this.date);
  }

  prev(): void {
    this.date = subDays(this.date, 1);
    this._onChange(this.date);
  }
}

