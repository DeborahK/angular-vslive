import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home.html'
})
export class Home {
  public pageTitle = 'Welcome to Star Wars Vehicle Sales';

}
