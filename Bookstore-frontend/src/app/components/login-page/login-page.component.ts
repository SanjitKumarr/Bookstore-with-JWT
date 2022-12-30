import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  
  loginForm: FormGroup;
  message: string = '';

  constructor(private formBuilder: FormBuilder, private router:Router, private ngZone:NgZone,
              private userAuthenticationService: UserAuthenticationService) {
    this.loginForm =this.formBuilder.group({
      email:[''],
      password:['']
    })
  }

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    this.userAuthenticationService.login(this.loginForm.value).subscribe((res:any)=>{
      console.log(res);
      this.message = '';
      this.userAuthenticationService.isUserAuthenticated.next(true);
      this.userAuthenticationService.accessToken.next(res);
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/user-page');
      })
    },error=>{
      if(error.error === 'Invalid Credentials'){
        this.message = 'User Doesnot Exist';
      }
    });
  }

}
