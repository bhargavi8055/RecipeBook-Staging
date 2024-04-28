import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
    selector:'app-auth',
    templateUrl:'./auth.component.html',
    styleUrls:['./auth.component.css']
})
export class AuthComponent implements OnDestroy{

    isLoginMode = true;
    isLoading = false;
    error:string = null;

    @ViewChild(PlaceholderDirective,{static:false}) alertHost:PlaceholderDirective;
    
    private closeSub:Subscription;

    constructor(private authService:AuthService,private router:Router,private componentFactoryResolver:ComponentFactoryResolver
        ){}
    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    onSubmit(form:NgForm){

        if(!form.valid){return;}

        const email = form.value.email;
        const password = form.value.password;

        let authObs:Observable<AuthResponseData>;

        this.isLoading=true
        if(this.isLoginMode){
            authObs = this.authService.login(email,password);
        }
        else{
            authObs = this.authService.signUp(email,password)
    
        }
        authObs.subscribe(resData=>{
            console.log(resData);
            this.isLoading=false;
            this.router.navigate(['/recipes']);
        },errorMessage=>{
            
            console.log(errorMessage);
            this.error=errorMessage;
            this.showErrorAlert(errorMessage)
            this.isLoading=false;

        });
        
        form.reset();

    }
    onHandleError(){
        this.error = null;
    }
    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }
    private showErrorAlert(message:string){

        const alertCmpFactory= this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

        const hostRef = this.alertHost.view;

        hostRef.clear();

       const comRef= hostRef.createComponent(alertCmpFactory);

       comRef.instance.message = message;

       this.closeSub=comRef.instance.close.subscribe(()=>{
        this.closeSub.unsubscribe();
        hostRef.clear();
       })
    }
}