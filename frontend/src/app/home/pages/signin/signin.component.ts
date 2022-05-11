import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsersService } from 'src/app/shared/services/users.service';
import { User, defaultUser } from 'src/app/shared/types/User';
import { ProfileService } from '../../../shared/services/profile.service';
import { HomeFacade } from '../../home.facade';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss', '../profile/profile.component.scss']
})
export class SigninComponent implements OnInit {

  public profile: User = defaultUser;
  interests: string[] = [
    'arte', 'comida', 'dança', 'jogos', 'livros', 'música', 'moda', 'saúde', 
    'beleza', 'filmes', 'viagens', 'futebol', 'cultura', 'esportes', 'artistas', 
    'história', 'economia', 'finanças', 'culinária', 'idiomas', 'negócios', 
    'política', 'religião', 'crianças', 'basquete', 'geografia', 'filosofia', 
    'tecnologia', 'literatura', 'fotografia',
  ]

  constructor(
    private profileService: ProfileService,
    private usersService: UsersService,
    private homeFacade: HomeFacade,
	  private router: Router,
  ) { 
    this.homeFacade.getProfile().subscribe(profile => {
      this.profile = {...this.profile, ...profile};
    });
  }

  ngOnInit(): void {}

  public register(newUser: User) {
    this.usersService.createUser(newUser).subscribe(async ({ data }) => {
      this.homeFacade.setProfile(newUser);
      if (data?.createUser) {
        if (data.createUser.title) {
          alert(data.createUser.title + '\n' + data.createUser.reason);
        }
        const { token } = await this.usersService.getToken();
        if (token) {
          localStorage.setItem("TOKEN", token);
          this.profileService.setProfile(newUser);
          this.router.navigate(['/']);
        }
      }
    });
  }
}
