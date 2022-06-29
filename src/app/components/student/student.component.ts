import { Component, OnInit } from '@angular/core';
import { Student } from './../../student';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  student:Student ={name:'',date_naiss:'',matricule:'',lastName: ''};

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
  matriculeEleve :string ='';
  codeClasse :string ='';
  //functions
  public deleteEleve(mat:string){
    let response = confirm('Voulez vous supprimer cet éléve !');
    if(response == true){
      let index = this.students.findIndex((t)=> t.matricule == mat);
      this.students.splice(index,1);
      this.alerter('Suppression de l\'éléve avec succès');
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
      this.alerter('Modification avec succès !');
    }else{
      // add new
      let student=this.student;
      this.students.push({
        matricule: student.matricule,
        name: student.name,
        date_naiss: student.date_naiss,
        lastName: student.lastName,
      });
      this.alerter('Enregistrement avec succès !');
    }
    this.resetEleve();
  }
  resetEleve()
  {
      this.student = new Student();
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
  constructor() { }

  ngOnInit(): void {
  }

}
