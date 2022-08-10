import { Component } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
  links = ['/movies', '/profile']
  activeLink = this.links[0]
  background: ThemePalette = undefined;
  constructor() { }

}