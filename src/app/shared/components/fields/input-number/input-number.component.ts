import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateFieldsService } from '../validate-fields.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss']
})
export class InputNumberComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() min = 0;
  @Input() max = 10;
  @Input() step = "1";

  constructor(public validateFields: ValidateFieldsService){}

  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }
}
