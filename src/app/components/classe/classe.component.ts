import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/classe';
import { ClasseService } from 'src/app/services/classe.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  constructor(public serviceClasse:ClasseService) {
    this.classes = new Array<Classe>();
  }
  ngOnInit(): void {
    this.serviceClasse.getAll().subscribe(data=>{
      console.log('data',data);
      this.response = data;
      this.classes =this.response;
    },error =>{
      console.log("error",error);
    })
  }
  response : any;
  classes : Array<any>;
  codeClasse :string ='';
  public classe:Classe ={code:'', nomination:''};
  //functions
  resetClasse(){
    this.classe = new Classe();
  }
  public deleteClasse(code:string) : void{
    let response = confirm('Voulez vous supprimer cette classe !');
    if(response == true){
      this.serviceClasse.deleteOne(code).subscribe(data =>{
        console.log(data,'data');
        let index = this.classes.findIndex((t)=> t.code == code);
        this.classes.splice(index,1);
        this.alerter('Suppression de la classe avec succès');
      },error=>{
        this.alerter('Erreur de suppression');
        console.log('error',error);
      });
    }else{

    }
  }
  public editClasse(classe:Classe){
    console.log('classe',classe);
    this.classe  = new Classe(classe?._id,classe?.code,classe?.nomination);
    console.log('classe',this.classe)
  }
  public saveClasse(_id:string){
     // controls
     let indexElement = this.classes.findIndex((cla) => cla._id == _id);
     if(indexElement  >= 0){
       // edit
       let classe = this.classe;
       this.serviceClasse.updateOne(_id,this.classe).subscribe(data=>{
        this.classes[indexElement]=classe;
        console.log(data);
        this.alerter('Modification avec succès !');
       },error=>{
        console.log(error);
        this.alerter('Erreur Modification !');
       })
     }else{
       // add new
       this.serviceClasse.insertOne(this.classe).subscribe(data=>{
        this.classes.push(data);
        console.log(data);
        this.alerter('Enregistrement avec succès !');
       },error =>{
        this.alerter('Erreur save data !');
       })
  }
  this.resetClasse();
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
