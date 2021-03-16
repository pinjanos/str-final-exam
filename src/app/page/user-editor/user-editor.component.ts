import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  user: User = new User();
  updating: boolean = false;
  /**
   * user$ {Observable<User>}
   * Can be two different type of User:
   * 1. If the params.id is 0: new User().
   * 2. If the params.id isn't 0: a user from the database based on its id.
   */
   user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap(params => this.userService.get(params.id))
  );

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onUpdate(form: NgForm, user: User): void {
    if (user.id === 0) {
      this.updating = true;
      this.userService.create(user).subscribe(
        () => this.router.navigate(['user']));
     
    } else {
      this.updating = true;
      this.userService.update(user).subscribe(
        () => this.router.navigate(['user']));
      
    }
  }


  // onUpdate(form: NgForm, user: User): void {
  //   if (user.id !== 0) {
  //     this.updating = true;
  //     this.userService.update(this.user).subscribe(
  //       () => this.router.navigate([''])
  //     );     
  //   }
  //    this.userService.create(user);
  //    this.router.navigate(['']);
  //  }

}
