import { Component } from '@angular/core';
import { Student } from './student';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app_assignement_week_2';
  student:any ={};
  isEleve = true;
  date_naiss = '2022-06-05';
  students = [
    {matricule: '20150426', name:'Diokou', lastName : 'cheikh', date_naiss : this.date_naiss},
    {matricule: '20150046', name:'aliu', lastName : 'Djalo', date_naiss : this.date_naiss},
    {matricule: '20150106', name:'Mariama', lastName : 'Mendy', date_naiss : this.date_naiss},
    {matricule: '20150086', name:'Fatou', lastName : 'Sall', date_naiss : this.date_naiss},
    {matricule: '20150436', name:'Laye', lastName : 'DIATTA', date_naiss : this.date_naiss},
  ];
  classes = [
    {code : 'TS1' , nomination : 'Terminale Serie S1'},
    {code : 'TS2' , nomination : 'Terminale Serie S2'},
    {code : 'TS3' , nomination : 'Terminale Serie S3'},
    {code : 'TSL2' , nomination : 'Terminale Serie L2'},
    {code : 'TSL1' , nomination : 'Terminale Serie L1'}
  ];
  public test(){
    alert("tester");
  }
  public delete(mat:string){
    let response = confirm('Voulez vous supprimer ce éléve !');
    if(response == true){
      let index = this.students.findIndex((t)=> t.matricule == mat);
      console.log(index);
      this.students.splice(index,1);
    }else{
      return ;
    }
    alert('delete' + mat);
  }
  public edit(mat:string){
    let item = this.students.find((t)=> t.matricule == mat);
    this.student  = item;
    console.log(this.student);
  }
  saveEleve(){
    this.students.push(this.student);
    alert('Enregistrement avec succès !');
  }
  toggle(){
    this.isEleve =!this.isEleve;
  }
}
