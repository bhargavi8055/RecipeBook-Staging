import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot,  CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable,map } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthGuard{

    constructor(){

    }
    static authGuardFn:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean | UrlTree>=>{
        const router = inject(Router);
        const authService = inject(AuthService);

        return authService.user.pipe(map(user=>{
            const isAuth = !!user;

            if(isAuth){
                return true;
            }
            return router.createUrlTree(['/auth']);
        }))
    }

}