import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidateFieldsService } from 'src/app/shared/components/fields/validate-fields.service';

@Component({
  selector: 'app-register-movies',
  templateUrl: './register-movies.component.html',
  styleUrls: ['./register-movies.component.scss']
})
export class RegisterMoviesComponent implements OnInit{
  register!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
              public validateFields: ValidateFieldsService) { }

  get f(){
    return this.register.controls;
  }

  ngOnInit() {
    this.register = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      pictureUrl: ['', [Validators.minLength(10)]],
      releaseDate: ['', [Validators.required]],
      description: [''],
      rating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      imdbUrl: ['', [Validators.minLength(10)]],
      genre: ['', [Validators.required]]
    });
  }

  save(): void{
    this.register.markAllAsTouched;
    if(this.register.invalid){
      return;
    }

    alert('Sucesso!\n\n' + JSON.stringify(this.register.value, null, 4));
  }

  resetForm(): void{
    this.register.reset;
  }

}
