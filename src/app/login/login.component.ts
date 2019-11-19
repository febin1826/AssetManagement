

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../login';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  isSubmitted = false;
  login:Login=new Login();
  logins: Observable <Login[]>;

  constructor(private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,private toastr:ToastrService) { }

  ngOnInit() {
    this.logins=this.authService.getLoginDet();
    this.loginForm=this.formBuilder.group({
      uname: ['',Validators.compose([Validators.required])],
      pass:['',[Validators.required]]
    });
  }

  get formControls()
  {
    return this.loginForm.controls;
  }

  loginUser()
  {
    this.login.uname=this.loginForm.controls.uname.value;
    this.login.pass=this.loginForm.controls.pass.value;
    console.log(this.loginForm.value);
    this.isSubmitted=true;
    if(this.loginForm.invalid)
    {
      this.toastr.error('Enter username and password');
      return;
    }
   
   this.authService.Login(this.login).subscribe(x=>{
     x.forEach(element => {
      console.log(this.login.utype);
      localStorage.setItem('uname',this.login.uname);
      this.login.utype=element["utype"];     
      if(this.login.utype=='Admin')
      {
        localStorage.setItem('ACCESS_TOKEN',this.login.utype);
        this.router.navigateByUrl('assets');
        //this.toastr.success('Login Successful');
      }
      else
      {
        this.router.navigateByUrl('assets');
        this.toastr.success('Login Successful');
      }
    },
    error=>{  
      this.toastr.error('Invalid Username or Password');
      
    }); 
     });
   
    
  }

}
