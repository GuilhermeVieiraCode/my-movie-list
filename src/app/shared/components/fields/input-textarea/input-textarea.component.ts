import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidateFieldsService } from '../validate-fields.service';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent {
  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  constructor(public validateFields: ValidateFieldsService){}

  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }
}
