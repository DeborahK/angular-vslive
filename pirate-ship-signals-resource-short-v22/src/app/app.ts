import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'pss-root',
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './app.html',
    styleUrls: ['./app.css']
})
export class App {
  pageTitle = 'Pirate Ship Sales';
}
