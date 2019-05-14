import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authS : AuthService) { }

  canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): any | boolean{

    // pour vérifier si l'utilisateur est bien connecté ~ service authService ...

    return true;
  }
}
