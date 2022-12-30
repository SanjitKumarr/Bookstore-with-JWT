import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthenticationService } from 'src/app/services/user-authentication.service';

@Component({
  selector: 'app-user-register-page',
  templateUrl: './user-register-page.component.html',
  styleUrls: ['./user-register-page.component.scss']
})
export class UserRegisterPageComponent implements OnInit {
  registerForm: FormGroup;
  message: string = '';

  constructor(private formBuilder: FormBuilder, private router:Router, private ngZone:NgZone,
              private userAuthenticationService: UserAuthenticationService) {
    this.registerForm =this.formBuilder.group({
      firstName:[''],
      lastName:[''],
      email:[''],
      password:['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userAuthenticationService.register(this.registerForm.value).subscribe((res:any)=>{
      console.log(res);
      this.message = 'User Registerd. Please login';
      // this.ngZone.run(()=>{
      //   this.router.navigateByUrl('/bookList')
      // })
    },error=>{
      console.log(error.error);
      if(error.error === 'User Already Exist. Please Login'){
        this.message = 'User Already Exist. Please Login';
      }else if(error.error === 'All input is required'){
        this.message = error.error;
      }
    });
  }
}
