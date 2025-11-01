import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterModule, HttpClientModule],
  template: `
    <router-outlet></router-outlet>
  `
})
export class App {
}
