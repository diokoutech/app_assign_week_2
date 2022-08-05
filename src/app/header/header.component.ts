import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable()
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }
  user:any;
  ngOnInit(): void {
    console.log('init');
  }

  logout(){
    localStorage.setItem('user','');
    localStorage.setItem('token','');
    localStorage.setItem('isLogin','false');
    this.router.navigate(['/']);
  }
  
}
