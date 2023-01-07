import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './components/articles/articles.component';
import { MuseumsComponent } from './components/museums/museums.component';
import { PresentationComponent } from './components/presentation/presentation.component';

const routes: Routes = [
  {path:'', redirectTo:'routeTitlePage', pathMatch: 'full'},
  {path: 'routeTitlePage', component: PresentationComponent},
  {path: 'museums', component: MuseumsComponent},
  {path: 'articles', component: ArticlesComponent},
  {path:'**', redirectTo:'/routeTitlePage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
