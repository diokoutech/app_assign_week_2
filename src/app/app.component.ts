import { Component } from '@angular/core';
import { Student } from './student';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app_assignement_week_2';
  student:Student ={name:'',date_naiss:'',matricule:'',lastName: ''};
  showElement = 'eleve';
  date_naiss = '2022-06-05';
  students = [
    {matricule: '20150426', name:'Diokou', lastName : 'cheikh', date_naiss : this.date_naiss},
    {matricule: '20150046', name:'aliu', lastName : 'Djalo', date_naiss : this.date_naiss},
    {matricule: '20150106', name:'Mariama', lastName : 'Mendy', date_naiss : this.date_naiss},
    {matricule: '20150086', name:'Fatou', lastName : 'Sall', date_naiss : this.date_naiss},
    {matricule: '20150436', name:'Laye', lastName : 'DIATTA', date_naiss : this.date_naiss},
    {matricule: '20150901', name:'Saliou', lastName : 'Fall', date_naiss : this.date_naiss},
    {matricule: '20120436', name:'Fall', lastName : 'SECK', date_naiss : this.date_naiss},
  ];
  classes = [
    {code : 'TS1' , nomination : 'Terminale Serie S1'},
    {code : 'TS2' , nomination : 'Terminale Serie S2'},
    {code : 'TS3' , nomination : 'Terminale Serie S3'},
    {code : 'TSL2' , nomination : 'Terminale Serie L2'},
    {code : 'TSL1' , nomination : 'Terminale Serie L1'}
  ];
  affectations = [];
  public deleteEleve(mat:string){
    let response = confirm('Voulez vous supprimer ce éléve !');
    if(response == true){
      let index = this.students.findIndex((t)=> t.matricule == mat);
      console.log(index);
      this.students.splice(index,1);
    }else{
      return ;
    }
  }
  public edit(mat:string){
    let item = this.students.find((t)=> t.matricule == mat);
    this.student  = new Student(item?.matricule,item?.name,item?.lastName,item?.date_naiss);
  }
  saveEleve(mat:string){
    // controls
    let indexElement = this.students.findIndex((stu) => stu.matricule == mat);
    if(indexElement >= 0){
      // edit 
      this.students[indexElement].matricule=this.student.matricule;
      this.students[indexElement].name=this.student.name;
      this.students[indexElement].lastName=this.student.lastName;
      this.students[indexElement].date_naiss=this.student.date_naiss;
      alert('Modification avec succès !');
    }else{
      // add new
      let student=this.student;
      this.students.push({
        matricule: student.matricule,
        name: student.name,
        date_naiss: student.date_naiss,
        lastName: student.lastName,
      });
      console.log(this.students);
      alert('Enregistrement avec succès !');
    }
    this.resetEleve();
  }
  toggle(element:string){
    this.showElement = element;
  }
  resetEleve()
  {
      this.student.matricule ='';
      this.student.lastName ='';
      this.student.name ='';
      this.student.date_naiss ='';
  }
  public deleteClasse(code:string){

  }
  public editClasse(code:string){

  }
}
