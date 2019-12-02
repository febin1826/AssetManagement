
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, Subscribable, Subscriber } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  login: Login = new Login();
  isSubmitted = false;
  logins: Observable<Login[]>;

  constructor(private service: AuthService, private router: Router,
    private formBuilder: FormBuilder, private toastr: ToastrService,private locationStrategy: LocationStrategy) { 
      history.pushState(null,null,window.location.href);
      this.locationStrategy.onPopState(()=>{
        history.pushState(null,null,window.location.href);
      });
    }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      uname: ['', [Validators.required]],
      pass: ['', [Validators.required]]
    });
  }

  get formControls() {
    return this.loginForm.controls;
  }

  loginUser() {
    if (this.loginForm.invalid) {
      this.toastr.error('Enter username and password..!!');
      return;
    }
    this.isSubmitted = true;
    this.service.Login(this.loginForm.value).subscribe(element => {
      if (element != null) {
        if (element["utype"] == 'Admin') {
          localStorage.setItem('ACCESS_TOKEN', element["uname"]);
          this.router.navigateByUrl('admin');
          this.toastr.success('Welcome Admin..!!', 'Login Successful');
        }
        else if (element["utype"] == 'Pmanager') {
          localStorage.setItem('ACCESS_TOKEN', element["uname"]);
          this.router.navigateByUrl('user');
          this.toastr.success('Welcome..!! ', 'Login Successful');
        }

      }
      else {
        this.toastr.error("Invalid Username or Password..!!");
      }
    });

  }

}