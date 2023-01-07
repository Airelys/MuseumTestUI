import { Article } from 'src/app/models/article';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Museum } from 'src/app/models/museum';
import { ArticleService } from 'src/app/services/article/article.service';
import { MuseumService } from 'src/app/services/museum/museum.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent {

  form:FormGroup;
  formUp:FormGroup;
  subscription: Subscription = new Subscription();
  createForm!: boolean;
  updateForm!: boolean;
  museum!: Museum | undefined;
  museumId:number | undefined = 0;
  museums: Array<Museum> = [];
  article: Article = new Article();

  constructor(private fb: FormBuilder, private museumService: MuseumService, private router: Router,
              private articleService: ArticleService) {
    this.form = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      isDamaged:[false,Validators.required]
    });
    this.formUp = this.fb.group({
      titleUp:['',Validators.required],
      descriptionUp:['',Validators.required],
      isDamagedUp:['',Validators.required],
      museumUp:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription=this.articleService.getCreate().subscribe(data => {
      this.createForm = data;
    });
    this.subscription=this.articleService.getEdit().subscribe(data => {
      this.updateForm = data;
    });
    this.subscription=this.museumService.getAll().subscribe(data => {
      this.museums = data;
    });

    this.subscription=this.museumService.getAll().subscribe(data =>{
      this.museums = data;
      this.subscription=this.articleService.getArt().subscribe(art => {
        this.article = art;
        this.museum = this.museums.find(x => x.id == this.article.museumId)
        this.formUp.patchValue({
          titleUp:this.article.title,
          descriptionUp:this.article.description,
          isDamagedUp:this.article.isDamaged,
          museumUp:this.museum?.name
        });
        this.museumId = this.museum?.id
      });
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  create(){
    const articleN: Article = new Article();
    articleN.title = this.form.get('title')?.value;
    articleN.description = this.form.get('description')?.value;
    articleN.isDamaged= this.form.get('isDamaged')?.value;
    articleN.museumId = this.museumId as number;
    console.log(articleN)
    this.articleService.create(articleN).subscribe(data => {
      console.log(data);
      this.articleService.updateCreate(false);
      this.router.navigate(['/articles']);
    });
  }

  update(){
    const articleNew: Article = new Article();
    articleNew.title = this.formUp.get('titleUp')?.value;
    articleNew.description = this.formUp.get('descriptionUp')?.value;
    articleNew.isDamaged= this.formUp.get('isDamagedUp')?.value;
    articleNew.id = this.article.id;
    articleNew.museumId = this.museumId as number;

    console.log(articleNew);
    this.articleService.update(articleNew).subscribe(data => {
      console.log(data);
      this.articleService.updateEdit(false);
    });
  }

  cancel(){
    this.articleService.updateCreate(false);
    this.articleService.updateEdit(false);
  }

}
