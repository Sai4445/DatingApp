import { error } from '@angular/compiler/src/util';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_Services/account.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister=new EventEmitter(); 

   registerForm: FormGroup;
   ValidationErrors: string[] = [];

  constructor(private accountService: AccountService,private toastr:ToastrService,private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    
   this.intializeForm();
    
  }
  intializeForm(){
    this.registerForm = this.fb.group({
      gender:['male'],  
      username:['',Validators.required],
      knownas:['',Validators.required],
      dateOfBirth:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(9)]],
      confirmPassword: [ '',[Validators.required,this.matchValues('password')]  ]
 
    })
  }
  matchValues(matchto: string) :ValidatorFn {
    return(control:AbstractControl ) =>{
      return control?.value ===control?.parent?.controls[matchto].value ? null:{isMatching:true}
    }
   
  }
  register(){
  
    this.accountService.register(this.registerForm.value).subscribe(response =>{
      
      this.router.navigateByUrl('/members');  

    } ,error =>{
     this.ValidationErrors= error;
     
     
    })
    
 
  }
  cancel(){

    this.cancelRegister.emit(false );
  }
}
