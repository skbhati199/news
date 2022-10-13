import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit   {
  title = 'news';
  @ViewChild(MatSidenav) sideNav!: MatSidenav;

  public sources : any[] = [];
  public articles : any[] = [];

  public selectedNewsChannel ="Top 10 Trending News!";

  constructor(private bp : BreakpointObserver, private cdr: ChangeDetectorRef, private newsApi: NewsService ) {

  }

  ngOnInit() {
    this.newsApi.initArticles()
    .subscribe((res:any) => {
      console.log(res);
      this.articles = res.articles;
    })
    this.newsApi.initSources()
    .subscribe((res:any) => {
      console.log(res);
      this.sources = res.sources;
    })
  }


  ngAfterViewInit() : void {
    this.sideNav.opened = true;
    this.bp.observe(['(max-width:720px)'])
    .subscribe((res) => {
      if(res.matches){
        this.sideNav.mode = "over"
        this.sideNav.close();
      } else {
        this.sideNav.mode = "side"
        this.sideNav.open();
      }
    })

    this.cdr.detectChanges()

  }

  searchSource(source:any){
    this.newsApi.getArticlesByID(source.id)
    .subscribe((res:any)=>{
      this.selectedNewsChannel = source.name
      this.articles = res.articles;
    })
  }

}
