import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from 'src/app/core/services/auth.service';
import { DbService } from 'src/app/core/services/db.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, CommonModule]
})
export class HomeComponent {
  private _router = inject(Router);

  private authservice = inject(AuthService);

  courses: any[] = [];

  constructor(private dbService: DbService) {}

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }

  ngOnInit(): void {

    this.getCouses();    

  }

  getCouses() : void{

    this.dbService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  redirectToPayment(curso: any) {
    this._router.navigate(['/payment'], {
        queryParams: {
            id: curso.id, // Suponiendo que cada curso tiene un identificador único 'id'
            image: curso.image,
            name: curso.name,
            price: curso.price
            // Agrega otros datos del curso que desees enviar al componente de pago
        }
    });
}

}
