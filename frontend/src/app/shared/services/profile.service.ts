import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { defaultUser, User } from '../types/User';

import { 
  SocialAuthService, 
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: BehaviorSubject<User|null> = new BehaviorSubject<User|null>(null);
  private loginProfile: BehaviorSubject<User|null> = 
    new BehaviorSubject<User|null>(null);

  constructor(
    private socialAuthService: SocialAuthService,
  ) {
    this.socialAuthService.authState.subscribe((user) => {
      if (!user) return;
      localStorage.setItem("TOKEN", user.authToken);
      this.loginProfile.next({
        ...defaultUser, 
        ...user, 
        profileImg: user.response.picture.data.url
      });
    });
  }

  public signIn(): void {
    this.socialAuthService.signIn(
      FacebookLoginProvider.PROVIDER_ID
    );
  }

  public signOut(): void {
    localStorage.removeItem("TOKEN");
    this.socialAuthService.signOut();
    this.profile.next(null);
  }

  public getProfile(): Observable<User|null> {
    return this.profile.asObservable()
  }
  
  public getLoginProfile(): Observable<User|null> {
    return this.loginProfile.asObservable()
  }

  public setProfile(profile: User) {
    this.profile.next(profile);
  }
}
