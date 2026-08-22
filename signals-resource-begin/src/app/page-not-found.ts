import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <h1>This is not the page you were looking for!</h1>
    `
})
export class PageNotFound {

}
