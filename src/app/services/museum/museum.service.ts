import { Museum } from './../../models/museum';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Article } from 'src/app/models/article';

@Injectable({
  providedIn: 'root'
})
export class MuseumService {

  apiUrl = 'https://localhost:7212/';
  getAllUrl = 'api/Museums/GetAllMuseums';
  createUrl = 'api/Museums/Create';
  updateUrl = 'api/Museums/Update';
  deleteUrl = 'api/Museums/Delete';
  getMuseumsTypeUrl = 'api/Museums/GetMuseumsType';

  private createBool = new BehaviorSubject<boolean>(false);
  private editBool = new BehaviorSubject<boolean>(false);
  private museum = new BehaviorSubject<Museum>({} as any);
  private museumArt = new BehaviorSubject<Museum>({} as any);


  constructor(private http: HttpClient) { }

  getAll(): Observable<Array<Museum>>{
    return this.http.get<Array<Museum>>(this.apiUrl + this.getAllUrl);
  }

  getMuseumsType(type:string): Observable<Array<Museum>>{
    return this.http.post<Array<Museum>>(this.apiUrl + this.getMuseumsTypeUrl,{"type":type});
  }

  create(museum:Museum): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl + this.createUrl,museum);
  }

  delete(museum:Museum): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl + this.deleteUrl,museum);
  }

  update(museum:Museum): Observable<boolean>{
    return this.http.post<boolean>(this.apiUrl + this.updateUrl,museum);
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

  updateMuseum(museum: Museum){
    this.museum.next(museum);
  }

  getMuseum():Observable<Museum>{
    return this.museum.asObservable();
  }

  updateMuseumArt(museum: Museum){
    this.museumArt.next(museum);
  }

  getMuseumArt():Observable<Museum>{
    return this.museumArt.asObservable();
  }

}

