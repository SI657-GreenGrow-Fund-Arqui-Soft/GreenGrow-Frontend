import { Component } from '@angular/core';
import { NewsService } from 'src/app/core/services/news.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent {
  articles: any[] = [];
  articleInit: any = ""
  loading: boolean = true

  constructor(private articlesService: NewsService) {}

  ngOnInit() {
    this.getArticles();
  }

  getArticles()
  {
    this.articlesService.getListArticles().subscribe((data: any) => {
      this.articles = data
      this.articleInit = data[0]
      this.loading = false
    })
  }
}
