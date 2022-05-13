import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { activity } from './activity';

import {ActivityService} from './activity.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  activity: activity[] = []
  form: FormGroup = new FormGroup({
    description : new FormControl('', [Validators.required, Validators.minLength(3)]) //esse segundo parametro é para array de validadores aula 25
  })
  constructor(private service: ActivityService){}

  ngOnInit(): void {
    this.listarActivity()
  }
  listarActivity(){
    this.service.listar().subscribe(activityList => {this.activity = activityList})

  }
  submit(){
    //console.log(this.form.value)
    const activity: activity = {...this.form.value} // ... é o spread operator (reticências)
    this.service.salvar(activity).subscribe(savedActivity => {
      this.activity.push(savedActivity); this.form.reset()
    }) //console.log(savedActivity)
    console.log(activity);
  }


  delete(activity: activity){
    this.service.deletar(activity.id).subscribe({next:(response)=>this.listarActivity()}) // esse next response não me retorna nada, pois é um delete então por isso usei esse listarActivity que é um método criado lá em cima
  }
  done(activity: activity) {
    this.service.marcarComoConcluido(activity.id).subscribe({
      next: (activityAtualizada) =>{
        activity.done = activityAtualizada.done
        activity.doneDate = activityAtualizada.doneDate}})
  }

  

  //title = 'angular-activity';
  //mensagem: String = 'hello , World';
}
