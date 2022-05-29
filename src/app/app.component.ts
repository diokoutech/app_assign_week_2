import { Component } from '@angular/core';
import { Student } from './student';
import Swal from 'sweetalert2';
import { Classe } from './classe';
import { Affectation } from './affectation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //properties
  title = 'app_assignement_week_2';
  student:Student ={name:'',date_naiss:'',matricule:'',lastName: ''};
  affectation:Affectation ={id:0,eleve: new Student(),classe : new Classe()};
  public classe:Classe ={code:'', nomination:''};
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
  affectations = [
    {id: 1,eleve : this.students[3], classe: this.classes[2]},
    {id: 2,eleve : this.students[0], classe: this.classes[2]},
    {id: 3,eleve : this.students[1], classe: this.classes[0]},
    {id:4,eleve : this.students[4], classe: this.classes[1]},
  ];

  //functions
  public deleteEleve(mat:string){
    let response = confirm('Voulez vous supprimer ce éléve !');
    if(response == true){
      let index = this.students.findIndex((t)=> t.matricule == mat);
      console.log(index);
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
      this.student = new Student();
  }
  resetClasse(){
    this.classe = new Classe();
  }
  public deleteClasse(code:string){
    let response = confirm('Voulez vous supprimer cette classe !');
    if(response == true){
      let index = this.classes.findIndex((t)=> t.code == code);
      console.log(index);
      this.classes.splice(index,1);
      this.alerter('Suppression de la classe ' + this.classes[index].nomination + ' avec succès');
    }else{
      return ;
    }
  }
  public editClasse(code:string){
    let item = this.classes.find((t)=> t.code == code);
    this.classe  = new Classe(item?.code,item?.nomination);
  }
  public saveClasse(code:string){
     // controls
     let indexElement = this.classes.findIndex((cla) => cla.code == code);
     if(indexElement >= 0){
       // edit
       this.classes[indexElement].code=this.classe.code;
       this.classes[indexElement].nomination=this.classe.nomination;
       this.alerter('Modification avec succès !');
     }else{
       // add new
       let classe=this.classe;
       this.classes.push({
         code: classe.code,
         nomination: classe.nomination,
       });
       this.alerter('Enregistrement avec succès !');
  }
  this.resetClasse();
  }
  public verifEleve() {
    
  }
  deleteAffectation(id:number){
    let response = confirm('Voulez vous supprimer cette affectation !');
    if(response == true){
      let index = this.affectations.findIndex((t)=> t.id == id);
      this.affectations.splice(index,1);
      this.alerter('Suppression de l\'affectation avec succès');
    }else{
      return ;
    }
  }
  public saveAffectation(id:number){
    alert('save affectation');
  }
  editAffectation(id:number){
    alert('edit affectation')
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
