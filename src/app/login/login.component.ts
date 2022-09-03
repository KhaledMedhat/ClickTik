import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    isSubmitted = false;
    authError = false;
    authMessage = 'Email or Password are wrong';

    constructor(
        private formBuilder: FormBuilder,
        private apiService: ApiService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._initLoginForm();
    }

    private _initLoginForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', Validators.required],
        });
    }

    onSubmit() {
        this.isSubmitted = true;

        if (this.loginForm.invalid) return;
        const loginData = {
            username: this.form['username'].value,
            password: this.form['password'].value,
        };
        this.apiService.login(loginData.username, loginData.password).subscribe(
            (user) => {
                this.authError = false;
                this.apiService.setToken(user.token);
                this.router.navigate(['/shop']);
            },
            (error: HttpErrorResponse) => {
                console.log(error);
                this.authError = true;
                if (error.status !== 400) {
                    this.authMessage = 'Error in the server';
                }
            }
        );
    }

    get form() {
        return this.loginForm.controls;
    }
}
