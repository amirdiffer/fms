import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { selectAuth } from '@core/auth/auth.selectors';
import { Observable } from 'rxjs';
import { AuthState, IUSer } from '@core/auth/auth.models';
import { select, Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { checkAccess } from '../auth/auth.actions';

@Directive({
  selector: '[CheckAccess]'
})
export class CheckAccessDirective implements OnInit {
  @Input('CheckAccess') checkAccess: string = ':';

  constructor(private el: ElementRef, private store: Store) {}

  selectIsAuthState = selectAuth;

  isAuthState$: Observable<AuthState>;

  ngOnInit(): void {
    let mockData: AuthState = {
      isAuthenticated: true,
      user: {
        group: [
          {
            name: 'sub-asset',
            actions: ['create', 'read', 'update', 'delete']
          },
          {
            name: 'task-master',
            actions: ['create', 'read', 'update', 'delete']
          }
        ],
        role: 'Admin'
      }
    };
    this.store.dispatch(checkAccess({ data: mockData }));
    this.isAuthState$ = this.store.pipe(select(this.selectIsAuthState));
    this.isAuthState$.pipe(first()).subscribe((data: AuthState) => {
      if (!this.hasAccess(data.user)) {
        (<HTMLElement>this.el.nativeElement).style.display = 'none';
      }
    });
  }

  hasAccess(user: IUSer): boolean {
    let access = this.checkAccess.split(':');
    let existGroup = [].concat(user.group).some((g) => g['name'] == access[0]);
    let existAction = []
      .concat(user.group.filter((g) => g.name == access[0]))
      .some((g) => [].concat(g['actions']).includes(access[1]));
    return existGroup && existAction;
  }
}
