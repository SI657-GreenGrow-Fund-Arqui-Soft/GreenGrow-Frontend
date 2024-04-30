import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'greengrow';

  constructor(private router: Router  ) { }

  shouldShowNavbar(): boolean {
    // Verifica si la ruta actual es diferente de la página de inicio de sesión
    return this.router.url !== '/login' && this.router.url !== '/signup';  }

}