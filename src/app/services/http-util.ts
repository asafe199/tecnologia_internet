import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

export abstract class HttpUtil {
  baseUrl = environment.apiGit;
  url: string;
  http: HttpClient;

  protected constructor(http: HttpClient, path: string) {
    this.url = this.baseUrl + '/' + path;
    this.http = http;
  }

  delete(object: any): Observable<any> {
    const finalUrl = this.url + '/' + object.id;
    return this.http.delete<any>(finalUrl);
  }

  get(any: any): Observable<any> {
    const url = this.url + '/' + any;
    return this.http.get<any>(url);
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  add(entity: any): Observable<any> {
    return this.http.post<any>(this.url, entity);
  }

  edit(entity: any): Observable<any> {
    return this.http.put<any>(this.url + '/' + entity.id, entity);
  }
}
