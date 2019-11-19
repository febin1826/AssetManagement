import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Login } from '../login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscribable, Subscriber } from 'rxjs';


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

  role:string;

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
      this.login.l_id=element["l_id"];
      if(this.login.l_id==1)
      {
        localStorage.setItem('uname',this.login.uname);
        this.router.navigateByUrl('assets');
        this.toastr.success('Login Successful..!!');
      }
      else
      {
        localStorage.setItem('uname',this.login.uname);
        this.router.navigateByUrl('assets');

        this.toastr.success('Login Successful..!!');
      }
    },
    error=>{
    
      this.toastr.error('Invalid Username or Password');
      
    });
    console.log(this.login.l_id);  
     });
   
    
  }
}
