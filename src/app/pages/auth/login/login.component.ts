import { AuthService } from './../../../@core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  public loginInvalid = false;

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value.username, this.form.value.password).subscribe({
        next: (data)=> {
          this.router.navigate([''])
        },
        error: (error) => {
          this.loginInvalid = true;
        }
      });
    }
  }

  buildForm(){
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
