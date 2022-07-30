import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import { StudentComponent } from './components/student/student.component';
import { AffectationComponent } from './components/affectation/affectation.component';
import { ClasseComponent } from './components/classe/classe.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthserviceService } from './services/authservice.service';
import { AuthGuard } from './auth.guard';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InterceptorService } from './interceptors/interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    StudentComponent,
    AffectationComponent,
    ClasseComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    FormsModule,
    HttpClientModule,
    MatProgressBarModule
  ],
  providers: [
    AuthserviceService,AuthGuard, {provide: HTTP_INTERCEPTORS,useClass: InterceptorService,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
