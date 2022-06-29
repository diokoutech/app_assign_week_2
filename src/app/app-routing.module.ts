import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AffectationComponent } from './components/affectation/affectation.component';
import { ClasseComponent } from './components/classe/classe.component';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'classe', component: ClasseComponent },
  { path: 'affectation', component: AffectationComponent },
  { path: 'eleve', component: StudentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
