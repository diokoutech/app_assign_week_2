import { Component, OnInit } from '@angular/core';
import { Student } from './../../student';
import Swal from 'sweetalert2';
import { EleveService } from 'src/app/services/eleve.service';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  response: any;
  student:Student ={nom:'',date_naiss:'',matricule:'',prenom: ''};
  students : Array<any>;
  constructor(private serviceEleve:EleveService) {
    this.students = new Array<Student>();
   }

  ngOnInit(): void {
    this.getDataAll();
  }
  public getDataAll(){
    this.serviceEleve.getAll().subscribe(res =>{
      console.log(res);
      this.response = res;
      this.students = this.response;
    },error => {
    this.alerter('Erreur recuperation des données !','error');
      console.log('Erreur recuperation des données ZOLA', error);
    });
    console.log('test get all');
  }
  //functions
  public deleteEleve(id:string){
    let response = confirm('Voulez vous vraiment supprimer cet element !');
    if(response == true){
      let index = this.students.findIndex((ele)=> ele._id == id);
      this.students.splice(index,1);
      this.serviceEleve.deleteOne(id).subscribe(data=>{
        console.log('data',data);
        if(data.status == true){
          this.alerter('Suppression avec succès','success');
        }
      },error=>{
        console.log(error);
      });
    }
  }
  public edit(id:string){
    let item = this.students.find((student)=> student._id == id);
    console.log(item);
    this.student  = new Student(item?._id,item?.matricule,item?.nom,item?.prenom,item?.date_naiss.toString().split('T')[0]);
    console.log(this.student,'new student');
  }
  saveEleve(id:string){
    console.log('student ',this.student);
    if(this.student._id === undefined){
      this.serviceEleve.insertOne(this.student).subscribe(data=>{
        console.log(data,'data');
        this.alerter('ajout avec succès !');
        this.students.push(data);
      },error=>{
        this.alerter('Erreur ajout eleve !' + error);
      })
    }else{
      this.serviceEleve.updateOne(this.student._id,this.student).subscribe(data=>{
        console.log(data,'data');
        this.alerter('Mise a jour avec succès !');
        this.getDataAll();
      },error=>{
        this.alerter('Erreur Mise a jour eleve !' + error);
      })
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

}
