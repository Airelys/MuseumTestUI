import { Article } from 'src/app/models/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Museum } from 'src/app/models/museum';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private createBool = new BehaviorSubject<boolean>(false);
  private editBool = new BehaviorSubject<boolean>(false);
  private article = new BehaviorSubject<Article>({} as any);

  apiUrl = 'https://localhost:7212/';
  createUrl = 'api/Articles/Create';
  updateUrl = 'api/Articles/Edit';
  deleteUrl = 'api/Articles/Remove';
  getMuseumsArticleUrl = 'api/Articles/GetMuseumsArticle'

  constructor(private http: HttpClient) { }

  create(article:Article): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl + this.createUrl,article);
  }

  delete(article:Article): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl + this.deleteUrl,article);
  }

  update(article:Article): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl + this.updateUrl,article);
  }

  getMuseumsArticles(museum: Museum): Observable<Array<Article>>{
    return this.http.post<Array<Article>>(this.apiUrl + this.getMuseumsArticleUrl,museum);
  }

  updateEdit(editBool:boolean){
    this.editBool.next(editBool);
  }

  getEdit():Observable<boolean>{
    return this.editBool.asObservable();
  }

  updateCreate(createBool:boolean){
    this.createBool.next(createBool);
  }

  getCreate():Observable<boolean>{
    return this.createBool.asObservable();
  }

  updateArt(article:Article){
    this.article.next(article);
  }

  getArt():Observable<Article>{
    return this.article.asObservable();
  }
}
