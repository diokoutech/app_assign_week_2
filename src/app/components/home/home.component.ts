import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/services/authservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  email:string = '';
  nom:string = '';
  prenom:string = '';
  password:string = '';
  password_confirm:string = '';
  show: boolean = true;

  constructor(public authService: AuthserviceService,private router: Router) { }

  ngOnInit(): void {
  }
  async submit(){
    let item = {
      email : this.email,
      password : this.password
    };
    let result = await this.authService.login(item);
    result.subscribe((data)=>{
      let response = data;
      if(response.status ==false){
        this.alerter("Erreur login : " + response.message);
      }else{
        this.alerter("Login Successfully !");
        this.logger(response.session);
        console.log(response);
      }
    },(error)=>{
      this.alerter("Erreur Server please contact SAV !");
      this.InitForm();
      console.log(error.message);
    });
  }
  logger(session : any){
    localStorage.setItem('user',JSON.stringify(session.user));
    localStorage.setItem('token',session.token);
    localStorage.setItem('isLogin','true');
    this.router.navigate(['/eleve']);
  }
  InitForm(){
    this.email = '';
    this.nom = '';
    this.prenom = '';
    this.password = '';
    this.password_confirm = '';
  }
  async register(){
  if(this.password === this.password_confirm && this.nom != '' && this.prenom != '' && this.email != '' && this.password != '' ){
    let item = {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password,
    }
    // send request
    const result = await this.authService.register(item);
    result.subscribe((data)=>{
      console.log(data);
      this.alerter("Inscription avec succès !");
      this.InitForm();
    },(error)=>{
      this.alerter('Erreur Inscription !');
      console.log(error);
    })
  }else{
    this.alerter('Veuilez respecter le format requis !')
  }
  }
  public alerter(msg:string,ic:string ="success"){
    let i = ic;
    Swal.fire({
      text: msg,
      toast: true,
      timerProgressBar: true,
      timer: 4000,
      showConfirmButton: false,
      width:350,
      background: 'bg-gray-500',
      position: 'top-end'
    });
  }
}
