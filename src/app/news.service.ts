import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http:HttpClient) { }

  getArticlesObservable(){
    return this.http.get("https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=98bb7b3b404e410aa6eee133daf782d5");
  }

}
