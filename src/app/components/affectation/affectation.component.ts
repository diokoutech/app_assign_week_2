import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Classe } from 'src/app/classe';
import { Student } from 'src/app/student';
import { Affectation } from 'src/app/affectation';
import { AffectationService } from 'src/app/services/affectation.service';
import { EleveService } from 'src/app/services/eleve.service';
import { ClasseService } from 'src/app/services/classe.service';
@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.css']
})
export class AffectationComponent implements OnInit {
  private response:any;
  constructor(private serviceAffectation:AffectationService,private serviceEleve:EleveService,private serviceClasse:ClasseService) {
    this.affectations = Array<Affectation>();
    this.students = Array<Student>();
    this.classes = Array<Classe>();
  }

  ngOnInit(): void {
   this.getAll();
    this.serviceEleve.getAll().subscribe(data=>{
      this.response = data;
      this.students = this.response;
    },error=>{
      console.log(error);
    });
    this.serviceClasse.getAll().subscribe(data=>{
      this.response = data;
      this.classes = this.response;
    },error=>{
      console.log(error);
    });
  }
  affectations: Array<any>;
  students: Array<any>;
  classes: Array<any>;
  student:any;
  classe:any;
  affectation:Affectation ={eleve: new Student(),classe : new Classe()};

  public getAll() {
    this.serviceAffectation.findAll().subscribe(data=>{
      this.response = data;
      this.affectations = this.response;
    },error=>{
      console.log(error);
    });
  }

  deleteAffectation(id:string){
    let response  = confirm('Voulez vous supprimer !');
    if(response){
      let index = this.affectations.findIndex((ele) => ele._id == id);
      this.affectations.splice(index,1);
      this.serviceAffectation.deleteOne(id).subscribe(data=>{
          this.alerter('Suppression de l\'affectation avec succès !');
      },error=>{
        console.log(error);
      });
    }
  }
  public saveAffectation(id:any = null){
    let eleve = this.students.find((stud)=> stud._id == this.student);
    let classe = this.classes.find((cla)=> cla._id == this.classe);
    let affect = {
      "eleve" : eleve,
      "classe" : classe
    };
    if(id == null){
      this.serviceAffectation.insertOne(affect).subscribe(data=>{
        console.log(data);
        if(data._id){
          this.affectations.push(data);
          this.alerter('Ajout Succes !');
        }else{
          this.alerter('Erreur ajout duplication !');
        }
        this.resetAffectation();
      },error=>{
        this.alerter('Erreur ajout !');
        console.log('error',error);
      })
    }else{
      this.serviceAffectation.updateOne(id,affect).subscribe(data=>{
        let response = {...data};
        this.getAll();
        this.alerter('Modification Success !');
        this.resetAffectation();
      },error=>{
        this.alerter('Erreur Modification !');
        console.log('error',error);
      })
    }
  }
  editAffectation(item:any){
    console.log(item,' item');
    this.affectation = item;
    this.student = item.eleve._id;
    this.classe = item.classe._id;
  }
  resetAffectation(){
    this.classe ='';
    this.student ='';
    this.affectation = new Affectation();
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
