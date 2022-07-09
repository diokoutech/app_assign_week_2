import { Classe } from "./classe"
import { Student } from "./student"

export class Affectation {
    constructor(        
        public _id? : any,
        public eleve : Student = new Student(),
        public classe: Classe = new Classe()
        ){}
}
