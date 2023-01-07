import { MuseumService } from './../../services/museum/museum.service';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Museum } from 'src/app/models/museum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.component.html',
  styleUrls: ['./museums.component.css']
})
export class MuseumsComponent {

  type = [{name:'All'},{name:'Art'},{name:'Natural Science'},{name:'History'}];
  museums!: Array<Museum>;
  subscription: Subscription = new Subscription();

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  dataObs$!: Observable<any>;
  len!:number;

  museumForm: boolean = false;
  updateForm: boolean = false;

  constructor(private router: Router,private museumService: MuseumService,
              private _changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void{

    this.subscription=this.museumService.getAll().subscribe(data => {
      this.museums = data;
      this.setPagination(this.museums);
      this.len = this.museums.length;
    });

    this.subscription=this.museumService.getCreate().subscribe(data => {
      this.subscription=this.museumService.getAll().subscribe(data2 => {
        this.museums = data2;
        this.setPagination(this.museums);
        this.len = this.museums.length;
        console.log(this.museums);
        this.museumForm = data;
      });
    });

    this.subscription=this.museumService.getEdit().subscribe(data => {
      this.subscription=this.museumService.getAll().subscribe(data2 => {
        this.museums = data2;
        this.setPagination(this.museums);
        this.len = this.museums.length;
        console.log(this.museums);
        this.updateForm = data;
      });
    });;
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

  typeAllMuseum(typeMuseum:string){
    if(typeMuseum=="All")
    {
      this.museumService.getAll().subscribe(data => {
        this.museums = data;
        this.setPagination(this.museums);
        this.len = this.museums.length;
        console.log(this.museums)
      });
    }
    else{
      this.museumService.getMuseumsType(typeMuseum).subscribe(data => {
        this.museums = data;
        this.setPagination(this.museums);
        this.len = this.museums.length;
        console.log(this.museums)
      });
    }
  }

  Create(){
    this.museumForm = true;
    this.museumService.updateCreate(true);
  }

  Delete(museum:Museum){
    this.museumService.delete(museum).subscribe(data =>{
      console.log(data);
      this.museumService.getAll().subscribe(data => {
        this.museums = data;
        this.setPagination(this.museums);
        this.len = this.museums.length;
        console.log(this.museums)
      });
    });
  }

  Update(museum: Museum){
    this.updateForm = true;
    this.museumService.updateEdit(true);
    this.museumService.updateMuseum(museum);
  }

  viewArticles(museum: Museum){
    this.museumService.updateMuseumArt(museum);
    this.router.navigate(['/articles'])
  }

}
