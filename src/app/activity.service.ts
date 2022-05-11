import { Injectable } from '@angular/core';

import {activity} from './activity'
import {Observable, observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  apiURL: string = 'http://localhost:8080/api/activities';

  constructor(private http: HttpClient) { }

  salvar(activity: activity) : Observable<activity>{
    return this.http.post<activity>(this.apiURL, activity)
    
  }
}
