import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
              }
  
  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.form.valid) {
      const { username, password } = this.form.value;
      this.authService.login(username, password)
        .subscribe(
          _ => {
            console.log('login :>> ');
            this.router.navigate(['/']);
          },
          (error: HttpErrorResponse) => {
            const data = error.error.data;
          }
        );
    }
    else {
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
