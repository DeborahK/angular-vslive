import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './home.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: ['./home.css']
})
export class Home {
  public pageTitle = 'Welcome to Star Wars Vehicle Sales';

}
