import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'anms-root',
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private translateService: TranslateService
    ) {}

  ngOnInit() {
    const appTitle =this.translateService.instant('projectName');
    this.router
      .events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child.firstChild) {
          child = child.firstChild;
        }
        if (child.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return appTitle;
      })
    ).subscribe((ttl: string) => {
      this.titleService.setTitle(this.translateService.instant(ttl));
    });
  }
}
