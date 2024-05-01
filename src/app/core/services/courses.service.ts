import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError} from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { DataModel } from '../models/data.model';

@Injectable({
    providedIn: 'root'
})
export class CoursesService {
    baseUrl = 'https://green-grow-421820.rj.r.appspot.com/api/green-grow/v1/courses';

    constructor(private http: HttpClient) { }

    httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
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
    getListCourses(): Observable<DataModel>{
      return this.http.get<DataModel>(this.baseUrl)
      .pipe(retry(2),catchError(this.handleError))
    }

    //GetById
    getCourseById(id: any): Observable<DataModel>{
      return this.http.get<DataModel>(this.baseUrl + '/' + id)
      .pipe(retry(2),catchError(this.handleError))
    }

    //Post
    createCourse(data: DataModel): Observable<DataModel>{
      return this.http.post<DataModel>(this.baseUrl, data, this.httpOptions)
      .pipe(retry(2),catchError(this.handleError))
    }
}
