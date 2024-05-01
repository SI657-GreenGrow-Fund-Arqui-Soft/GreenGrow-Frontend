import { Component } from '@angular/core';
import { DbService } from 'src/app/core/services/db.service';

@Component({
  selector: 'app-comunnity',
  templateUrl: './comunnity.component.html',
  styleUrls: ['./comunnity.component.scss']
})
export class ComunnityComponent {
  
  posts: any[] = [];
  trends: any[] = [];

  constructor(private dbService: DbService) {}

  ngOnInit(): void {
    this.getPosts();
    this.getTrends();
  }

  getPosts() {
    this.dbService.getPosts().subscribe((data: any[]) => {
      this.posts = data;
    });
  }

  getTrends() {
    this.dbService.getTrends().subscribe((data: any[]) => {
      this.trends = data;
    });
  }
}
