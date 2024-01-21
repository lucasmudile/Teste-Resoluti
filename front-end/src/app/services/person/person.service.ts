import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ENV } from 'src/enviroments/enviroment.dev';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer `+localStorage.getItem('token'),
  }),
};

const httpOptionsImage = {
  headers: new HttpHeaders({
    'Authorization': `Bearer `+localStorage.getItem('token'),
  }),
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  readonly PhotoUrl = "https://localhost:44327/Photos/";

  constructor(private http:HttpClient) { }

  url:string="";

  deletePerson(id:string){
    return this.http.delete<any>(`${ENV.apiURL}Person/${id}`,httpOptions);
  }

  getAll(pageNumber:number,pageSize:number,search:string):Observable<any>{
     this.url="?pageNumber="+pageNumber+"&pageSize="+pageSize
     if(search!='')
      this.url="?pageNumber="+pageNumber+"&pageSize="+pageSize+"&search="+search
    return this.http.get<any>(`${ENV.apiURL}Person`+this.url,httpOptions);
  }



  getAllWithouPaging():Observable<any>{
   return this.http.get<any>(`${ENV.apiURL}Person/list?`,httpOptions);
 }

  addPerson(person: any): Observable<any> {
    return this.http.post<any>(ENV.apiURL+'Person', person, httpOptions);
  }

  UploadPhoto(val:any){
    return this.http.post(ENV.apiURL+'Person/SaveFile',val,httpOptionsImage);
  }

}
