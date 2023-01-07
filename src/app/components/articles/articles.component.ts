import { ArticleService } from './../../services/article/article.service';
import { Museum } from 'src/app/models/museum';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MuseumService } from 'src/app/services/museum/museum.service';
import { Article } from 'src/app/models/article';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {

  subscription: Subscription = new Subscription();
  museum:Museum = new Museum();
  articles: Array<Article> = [];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;
  len!:number;

  createArt:boolean = false;
  updateArt:boolean = false;

  constructor(private router: Router,private museumService: MuseumService,
              private _changeDetectorRef: ChangeDetectorRef, private articleService: ArticleService) { }

  ngOnInit(): void{
    this.subscription=this.articleService.getCreate().subscribe(data => {
      this.createArt = data;
      this.subscription=this.museumService.getMuseumArt().subscribe(data => {
        this.museum = data;
        console.log(this.museum);
        this.subscription=this.articleService.getMuseumsArticles(this.museum).subscribe(data2 => {
          if(data2!=null){
            this.articles = data2;
            console.log(this.articles);
          }
          this.setPagination(this.articles);
          this.len = this.articles.length});
      });
    });
    this.subscription=this.articleService.getEdit().subscribe(data => {
      this.updateArt = data;
      this.subscription=this.museumService.getMuseumArt().subscribe(data => {
        this.museum = data;
        console.log(this.museum);
        this.subscription=this.articleService.getMuseumsArticles(this.museum).subscribe(data2 => {
          if(data2!=null){
            this.articles = data2;
            console.log(this.articles);
          }
          this.setPagination(this.articles);
          this.len = this.articles.length});
      });
    });
    this.subscription=this.museumService.getMuseumArt().subscribe(data => {
      this.museum = data;
      console.log(this.museum);
      this.subscription=this.articleService.getMuseumsArticles(this.museum).subscribe(data2 => {
        if(data2!=null){
          this.articles = data2;
          console.log(this.articles);
        }
        this.setPagination(this.articles);
        this.len = this.articles.length});
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  setPagination(tableData:any) {
    this.dataSource = new MatTableDataSource<any>(tableData);
    this._changeDetectorRef.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataObs$ = this.dataSource.connect();
  }

  create(){
    this.createArt = true;
    this.articleService.updateCreate(true);
  }

  delete(article:Article){
    console.log(article);
    const articleDel: Article = {
      id: article.id,
      title: article.title,
      description: article.description,
      isDamaged: article.isDamaged,
      museumId: article.museumId
    }

    console.log(articleDel);
    this.articleService.delete(articleDel).subscribe(data =>{
      console.log(data);
      this.articleService.getMuseumsArticles(this.museum).subscribe(data => {
        this.articles = data;
        this.setPagination(this.articles);
        this.len = this.articles.length;
        console.log(this.articles)
      });
    });
  }

  update(article: Article){
    this.updateArt = true;
    this.articleService.updateEdit(true);
    this.articleService.updateArt(article);
  }
}
