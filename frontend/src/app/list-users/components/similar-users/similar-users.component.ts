import { Component, Input } from '@angular/core';
import { User } from 'src/app/shared/types/User';
import { FuiModalService } from 'ngx-fomantic-ui';
import { ModalDetails } from '../modal-details/modal-details.component';

import { ListUsersFacade } from '../../list-users.facade';
import { Rate } from '../../types/rate';

@Component({
  selector: 'app-similar-users',
  templateUrl: './similar-users.component.html',
  styleUrls: ['./similar-users.component.scss'],
})
export class SimilarUsersComponent {
  @Input()
  users: User[] = [];

  userInModal?: User;

  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  constructor(
    public modalService: FuiModalService,
    private listUsersFacade: ListUsersFacade,
  ) {}

  showUserModal = (user: User) => {
    this.modalService
      .open(
        new ModalDetails(
          user
        )
      )
  };

  rateUser(rate: Rate) {
    this.listUsersFacade.rateUser(rate)
  }
}
