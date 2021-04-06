import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public showPasswordError: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    });
  }

  public createUser(): void {
    this.showPasswordError = !this.checkPasswords();

    if (this.showPasswordError)
      return;

    const objectToStore = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    localStorage.setItem('account', JSON.stringify(objectToStore));
    this.router.navigate(['/dashboard']);
  }

  private checkPasswords(): boolean {
    const password = this.loginForm.value.password;
    const confirmPassword = this.loginForm.value.confirm_password;

    return password === confirmPassword;
  }
}
