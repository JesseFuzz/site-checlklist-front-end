import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { activity } from './activity';

import {ActivityService} from './activity.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form: FormGroup = new FormGroup({
    description : new FormControl('')
  })
  constructor(private service: ActivityService){

  }
  submit(){
    console.log(this.form.value)
    const activity: activity = {...this.form.value} // ... é o spread operator (reticências)
    this.service.salvar(activity).subscribe(savedActivity => console.log(savedActivity))
  }

  

  title = 'angular-activity';
  mensagem: String = 'hello , World';
}
