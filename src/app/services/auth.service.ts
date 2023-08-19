import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { AppStateService } from './app-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http : HttpClient , private appState : AppStateService) { }

  async login( username :string , password : string): Promise<any> {
    let user: any = await firstValueFrom(this.http.get("http://localhost:8083" + username));
    if(password == btoa(user.password)){
       let decodedJwt: any = jwtDecode(user.token);
       this.appState.authState({
        username : decodedJwt.sub,
        roles : decodedJwt.roles,
        isAuthenticated : true,
        token : user.token
       });
       return Promise.resolve(true);
    }else{
      return Promise.reject("Bad Credentials");
    }
  }

}
