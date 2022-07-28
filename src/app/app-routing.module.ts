import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AffectationComponent } from './components/affectation/affectation.component';
import { ClasseComponent } from './components/classe/classe.component';
import { HomeComponent } from './components/home/home.component';
import { StudentComponent } from './components/student/student.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'classe', component: ClasseComponent,canActivate: [AuthGuard] },
  { path: 'affectation', component: AffectationComponent,canActivate: [AuthGuard] },
  { path: 'eleve', component: StudentComponent,canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
