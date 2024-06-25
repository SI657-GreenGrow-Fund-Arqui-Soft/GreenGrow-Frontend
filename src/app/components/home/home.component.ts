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
  featureCourses: any[] = [];
  otherCourses: any[] = [];

  constructor(private dbService: DbService) {}

  async logOut(): Promise<void> {
    try {
      await this.authservice.logOut();
      this._router.navigateByUrl('/auth/log-in');
    } catch (error) {
      console.log(error);
    }
  }
  activeItem: string = 'home';

  handleItemClick(item: string) {
    this.activeItem = item;
  }

  ngOnInit(): void {

    this.getCouses();    

  }

  getCouses() : void{

    this.dbService
      .getCourses()
      .subscribe((courses) => {
        this.courses = courses;
        this.featureCourses = this.courses.slice(0,3);
        this.otherCourses = this.courses.slice(0,8);
      });
  
  }

  offers = [
    {
      image: 'https://www.edx.org/contentful/ii9ehdcj88bc/2depiIx5lt9DcoegVedK0c/0c302992182a12f41bea84160cc96cad/Aprende_agricultura.jpg?w=509&h=339&q=50&fm=webp',
      title: 'Courses',
      description: '"Discover courses that guide you from beginner to expert in agriculture."',
    },
    {
      image: 'https://thumbs.dreamstime.com/b/pajares-y-cabinas-de-madera-casas-c%C3%A1rpatas-tradicionales-del-pueblo-en-ucrania-comunidad-granjera-modesta-los-%C3%A9ticas-hutsuls-155097084.jpg',
      title: 'Community',
      description: 'Join our community to share, learn, and collaborate with other indoor farming enthusiasts.',
    },
    {
      image: 'https://image.isu.pub/191228050340-0ec30d555db71fc37456c12ae5372676/jpg/page_1_thumb_large.jpg',
      title: 'Articles',
      description: 'Read our articles to stay up to date with tips and trends in indoor farming.',
    }
  ];

  redirectToPayment(curso: any) {
    this._router.navigate(['/payment'], {
        queryParams: {
            id: curso.id, // Suponiendo que cada curso tiene un identificador único 'id'
            image: curso.image,
            name: curso.name,
            price: curso.price
        }
    });
}

}
