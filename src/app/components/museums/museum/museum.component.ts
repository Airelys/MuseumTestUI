import { MuseumService } from './../../../services/museum/museum.service';
import { Museum } from './../../../models/museum';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-museum',
  templateUrl: './museum.component.html',
  styleUrls: ['./museum.component.css']
})
export class MuseumComponent {

  form:FormGroup;
  formUp:FormGroup;
  type = [{name:'Art'},{name:'Natural Science'},{name:'History'}];
  subscription: Subscription = new Subscription();
  createForm!: boolean;
  updateForm!: boolean;
  museum: Museum = new Museum();

  constructor(private fb: FormBuilder, private museumService: MuseumService, private router: Router) {
    this.form = this.fb.group({
      name:['',Validators.required],
      city:['',Validators.required],
      address:['',Validators.required],
      typeMuseum:['',Validators.required]
    });
    this.formUp = this.fb.group({
      nameUp:['',Validators.required],
      cityUp:['',Validators.required],
      addressUp:['',Validators.required],
      typeMuseumUp:['',Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscription=this.museumService.getCreate().subscribe(data => {
      this.createForm = data;
    });
    this.subscription=this.museumService.getEdit().subscribe(data => {
      this.updateForm = data;
    });
    this.subscription=this.museumService.getMuseum().subscribe(data => {
      this.museum = data;
      this.formUp.patchValue({
        nameUp:this.museum.name,
        cityUp:this.museum.city,
        addressUp:this.museum.address,
        typeMuseumUp:this.museum.type
      });
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  create(){
    const museumN: Museum = new Museum();
    museumN.name = this.form.get('name')?.value;
    museumN.address = this.form.get('address')?.value;
    museumN.city= this.form.get('city')?.value;
    museumN.type = this.form.get('typeMuseum')?.value;
    console.log(museumN)
    this.museumService.create(museumN).subscribe(data => {
      console.log(data);
      this.museumService.updateCreate(false);
      this.router.navigate(['/museums']);
    });
  }

  update(){
    console.log("asgdhfjm,");
    const museumNew: Museum = new Museum();
    museumNew.name = this.formUp.get('nameUp')?.value;
    museumNew.address = this.formUp.get('addressUp')?.value;
    museumNew.city= this.formUp.get('cityUp')?.value;
    museumNew.type = this.formUp.get('typeMuseumUp')?.value;
    museumNew.id = this.museum.id;
    console.log(museumNew)

    this.museumService.update(museumNew).subscribe(data => {
      console.log(data);
      this.museumService.updateEdit(false);
    });
  }

  cancel(){
    this.museumService.updateCreate(false);
    this.museumService.updateEdit(false);
  }

}
