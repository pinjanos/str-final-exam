import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList$: BehaviorSubject<User[]> = this.userService.list$;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll();
  }

  // onUpdate(user: User): void {
  //   this.userService.update(user);
  // }

  onDelete(user: User): void {
    this.userService.remove(user);
  }

  // onCreate(user: User): void {
  //   this.userService.create(user);
  // }

}
