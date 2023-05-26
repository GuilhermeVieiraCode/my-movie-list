import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidateFieldsService } from '../validate-fields.service';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() options!: Array<string>;

  constructor(public validateFields: ValidateFieldsService){}

  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }
}
