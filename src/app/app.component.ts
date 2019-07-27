import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewsService } from './news.service';
import { ConfigService } from './config.service';

export class Config {
  heroesUrl: string;
  textfile: string;
}

export interface Article {
  title: string;
  description: string;
  urlToImage : string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-news-app';
  news;
  config:Config;
  errorMessage;

  constructor(private newsService:NewsService, private configService: ConfigService){

   this.config = new Config();
   this.config.heroesUrl ="test";
    
  }

  ngOnInit()
  {
   this.loadArticles();
  //  this.showConfig();
  }

  loadArticles(){
    this.newsService.getArticlesObservable()
    .subscribe( (data) => this.onDataRecieved(data),(error)=> this.onErrorRecieved(error));
  }

  onDataRecieved(data){
    console.log(typeof(this.config.heroesUrl));
    this.news = data['articles'];
    console.log(this.news);
  }

  onErrorRecieved(error){
    console.log(error)
      
    this.errorMessage = "Something went wrong" + error.statusText;
 
    
  }

  retry(){

    this.errorMessage = undefined;
    this.loadArticles();
  }


  showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => 
      {
          this.config = {
          heroesUrl: data['heroesUrl'],
          textfile:  data['textfile']
        }

          console.log(this.config);
      }
    
      );
  }
}
