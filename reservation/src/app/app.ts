import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
  template: `<h1>Reservation App</h1>
  <p>If you're seeing this, routing should be working.</p>
  <router-outlet></router-outlet>
`
})
export class App {
  protected title = 'reservation';
}
