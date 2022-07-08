import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Classe } from 'src/app/classe';
import { Student } from 'src/app/student';
import { Affectation } from 'src/app/affectation';
@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  matriculeEleve :string ='';
  codeClasse :string ='';
  student:Student ={nom:'',date_naiss:'',matricule:'',prenom: ''};
  affectation:Affectation ={id:0,eleve: new Student(),classe : new Classe()};
  public classe:Classe ={code:'', nomination:''};
  showElement = 'eleve';
  date_naiss = '2022-06-05';

  public verifEleve() {

  }
  deleteAffectation(id:number){

  }
  public saveAffectation(id:number){
    // if(this.codeClasse !='' && this.matriculeEleve !=''){
    //   let eleveR = this.students.find((ele) => ele.matricule == this.matriculeEleve);
    //   let classeR = this.classes.find((cla) => cla.code == this.codeClasse);
    //   let affected = this.affectations.find((aff) => aff.eleve.matricule == eleveR?.matricule && aff.classe.code == classeR?.code )
    //   if(affected){
    //     this.alerter("deja enregistrée !");
    //     return ;
    //   }else{
    //     let idNew = this.affectations.length;
    //     this.affectations.push({
    //       id: idNew,
    //       classe: new Classe(classeR?.code,classeR?.nomination),
    //       eleve: new Student(eleveR?.matricule,eleveR?.nom,eleveR?.prenom,eleveR?.date_naiss) ,
    //     })
    //   }
    //   this.resetAffectation();
    //   this.alerter('Affectation de l\'éleve avec succès !');
    // }else{
    //   Swal.fire('Affectation','Veuillez remplir tous les champs','error');
    // }
  }
  editAffectation(id:number){
    // console.log(" id number ",id);
    // let aff = this.affectations.find((aff) => aff.id == id);
    // this.matriculeEleve = aff?.eleve.matricule ?? '';
    // this.codeClasse = aff?.classe.code ?? '';
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
