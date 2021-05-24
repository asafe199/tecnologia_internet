import { Injectable } from '@angular/core';
import {HttpUtil} from './http-util';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ReposModel} from '../models/repos_model';

@Injectable({
  providedIn: 'root'
})

export class GitApiService extends HttpUtil{
  constructor(http: HttpClient) {
    super(http, 'users');
  }

  getRepo(userName: string) : Observable<ReposModel[]>{
    return this.http.get<ReposModel[]>(`${this.url + '/' + userName + '/repos'}`);
  }

  getStarred(userName: string) : Observable<ReposModel[]>{
    return this.http.get<ReposModel[]>(`${this.url + '/' + userName + '/starred'}`);
  }
}
