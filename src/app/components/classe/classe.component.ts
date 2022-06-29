import { Component, OnInit } from '@angular/core';
import { Classe } from 'src/app/classe';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  constructor() { }
  ngOnInit(): void {
  }
  classes = [
    {code : 'TS1' , nomination : 'Terminale Serie S1'},
    {code : 'TS2' , nomination : 'Terminale Serie S2'},
    {code : 'TS3' , nomination : 'Terminale Serie S3'},
    {code : 'TSL2' , nomination : 'Terminale Serie L2'},
    {code : 'TSL1' , nomination : 'Terminale Serie L1'}
  ];
  codeClasse :string ='';
  public classe:Classe ={code:'', nomination:''};
  //functions
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
