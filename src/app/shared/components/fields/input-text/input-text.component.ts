import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidateFieldsService } from '../validate-fields.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {

  @Input() title!: string;
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;

  constructor(public validateFields: ValidateFieldsService){}

  get formControl(): AbstractControl{
    return this.formGroup.controls[this.controlName];
  }
}
