import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AffectationComponent } from './components/affectation/affectation.component';
import { ClasseComponent } from './components/classe/classe.component';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';
import { LayoutbackComponent } from './layoutback/layoutback.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'backoffice', component: LayoutbackComponent,
  children: [
    { path: 'classe', component: ClasseComponent},
    { path: 'affectation', component: AffectationComponent },
    { path: 'eleve', component: StudentComponent,},
  ],
  canActivate: [AuthGuard] 
  },
  { path : '**', pathMatch: 'full',redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
