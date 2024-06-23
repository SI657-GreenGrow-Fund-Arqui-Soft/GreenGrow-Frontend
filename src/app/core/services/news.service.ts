import { ArticleModel } from './../models/articles.model';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NewsService {
  baseUrl = 'https://green-grow-421820.rj.r.appspot.com/api/green-grow/v1/articles';
  //baseUrl = 'http://localhost:8000/api/green-grow/v1/articles';

    constructor(private http: HttpClient) { }

    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    };

    handleError(error: HttpErrorResponse){
      if(error.error instanceof ErrorEvent){
        console.log(`An error ocurred ${error.status}, body was ${error.error}`);
      }
      else{
        console.log(`Backend returned code ${error.status}, body was ${error.error}`);
      }
      return throwError(
        'Something happened with request, please try again later'
      );
    }

    //GET
    getListArticles(): Observable<ArticleModel>{
      return this.http.get<ArticleModel>(this.baseUrl)
      .pipe(retry(2),catchError(this.handleError))
    }

    //GetById
    getArticleById(id: any): Observable<ArticleModel>{
      return this.http.get<ArticleModel>(this.baseUrl + '/' + id)
      .pipe(retry(2),catchError(this.handleError))
    }
}
