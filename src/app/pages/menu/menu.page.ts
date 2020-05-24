import { Router } from '@angular/router';
import { Events } from './../../services/events/events.service';
import { Component, OnInit } from '@angular/core';
import { EVENTS } from './../../types/custom-events';
import { TranslatableComponent } from './../../components/translatable/translatable';
import { LanguageService } from './../../services/language/language.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage extends TranslatableComponent implements OnInit {

  constructor(langService: LanguageService, private events: Events, private router: Router) {
    super(langService);

    events.subscribe(EVENTS.logoutSuccess, event => {
      console.log('EVENT LOGOUT CATCHED, LOGOUT');
      this.router.navigate(['']);
      events.destroy(EVENTS.logoutSuccess);
    });
  }

  ngOnInit () {
  }

}
