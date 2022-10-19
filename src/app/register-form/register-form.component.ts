import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
          ],
        ],
        userName: ['', [Validators.required, Validators.pattern('^\\S*$')]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confPassword: ['', Validators.required],
      },
      {
        validators: this.passConfitmation('password', 'confPassword'),
      }
    );
  }

  ngOnInit(): void {}
  get formControls() {
    return this.registerForm.controls;
  }

  handleRegSubmit() {
    console.log(this.registerForm);
  }

  private passConfitmation(
    controlNameA: string,
    controlNameB: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup;
      const firstVal = formGroup.get(controlNameA)?.value;
      const secVal = formGroup.get(controlNameB)?.value;

      if (firstVal == secVal) {
        return null;
      } else {
        return { valuesNotTheSame: true };
      }
    };
  }
}
