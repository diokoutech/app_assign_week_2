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
    {id: 0,eleve : this.students[3], classe: this.classes[2]},
    {id: 1,eleve : this.students[0], classe: this.classes[2]},
    {id: 2,eleve : this.students[1], classe: this.classes[0]},
    {id:3,eleve : this.students[4], classe: this.classes[1]},
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
    let affected = this.affectations.find((aff)=> aff.eleve.matricule == this.matriculeEleve);
    if(affected){
      // alert('trouve');
      this.alerter('cet éléve a deja été affecté !');
      this.resetAffectation()
    }else{
      let eleve = this.students.find((ele) => ele.matricule == this.matriculeEleve);
      let classe = this.classes.find((cla) => cla.code == this.codeClasse);
      let idNew = this.affectations.length;
      console.log("eleve",eleve,"classe",classe,"id", idNew);
    }
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
    if(this.codeClasse !='' && this.matriculeEleve !=''){
      let eleveR = this.students.find((ele) => ele.matricule == this.matriculeEleve);
      let classeR = this.classes.find((cla) => cla.code == this.codeClasse);
      let affected = this.affectations.find((aff) => aff.eleve.matricule == eleveR?.matricule && aff.classe.code == classeR?.code )
      if(affected){
        this.alerter("deja enregistrée !");
        return ;
      }else{
        let idNew = this.affectations.length;
        this.affectations.push({
          id: idNew,
          classe: new Classe(classeR?.code,classeR?.nomination),
          eleve: new Student(eleveR?.matricule,eleveR?.name,eleveR?.lastName,eleveR?.date_naiss) ,
        })
      }
      this.resetAffectation();
      this.alerter('Affectation de l\'éleve avec succès !');
    }else{
      Swal.fire('Affectation','Veuillez remplir tous les champs','error');
    }
  }
  editAffectation(id:number){
    console.log(" id number ",id);
    let aff = this.affectations.find((aff) => aff.id == id);
    this.matriculeEleve = aff?.eleve.matricule ?? '';
    this.codeClasse = aff?.classe.code ?? '';
  }
  resetAffectation(){
    this.matriculeEleve ='';
    this.codeClasse ='';
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
