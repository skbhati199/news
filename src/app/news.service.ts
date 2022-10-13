import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  API_KEY = "1c4c3bff98c14323423";

  constructor(private http:HttpClient) { }


  initSources() {
    return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey=' + this.API_KEY);
  }


  getArticlesByID(source:string){
    return  this.http.get("https://newsapi.org/v2/top-headlines?sources=" + source + "&apiKey="+ this.API_KEY);
  }

  initArticles(){
    return  this.http.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey="+ this.API_KEY );
  }

}
