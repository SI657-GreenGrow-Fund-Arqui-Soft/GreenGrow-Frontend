import {Component, inject} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router, RouterModule} from '@angular/router';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {AuthService, Credential} from 'src/app/core/services/auth.service';
import {ButtonProviders} from 'src/app/components/button-providers/button-providers.component'
import {DbService} from "../../../core/services/db.service";

interface LogInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonProviders,
  ],
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  providers: [],
})
export default class LogInComponent {
  hide = true;

  constructor( private dbService: DbService, private authService: AuthService) {
  }
  formBuilder = inject(FormBuilder);


  private router = inject(Router);

  private _snackBar = inject(MatSnackBar);

  private _loginObject: any;

  form: FormGroup<LogInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),


  });

  goToSignUp() {
    this.router.navigate(['/signup']); // Esto navegará al componente SignUpComponent
  }

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? 'This field is required'
        : 'Enter a valid email';
    }

    return false;
  }

  async logIn(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      let identity = await this.authService.logInForBackend(credential)
      this.authService.tokenSetter(identity.idToken);
      await this.authService.logInWithEmailAndPassword(credential);
      const snackBarRef = this.openSnackBar();
      snackBarRef.afterDismissed().subscribe(() => {
        console.log("funciona")
        this.router.navigateByUrl('/home');
      });
    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar() {
    return this._snackBar.open('Succesfully Log in 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
