import { Classe } from "./classe"
import { Student } from "./student"

export class Affectation {
    constructor(        
        public id:number,
        public eleve:Student,
        public classe: Classe
        ){}
}
