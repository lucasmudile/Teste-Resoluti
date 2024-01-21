import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { ENV } from 'src/enviroments/enviroment.dev';
import { Observable } from 'rxjs';
import { AddUserComponent } from 'src/app/components/crud-user/add-user/add-user.component';
import { UserAdd,userUpdate } from 'src/app/interfaces/user';

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
export class UserService {

  readonly PhotoUrl = "https://localhost:44358/Photos/";
  constructor(private http:HttpClient) { }

  
  url:string="";


  getAll(pageNumber:number,pageSize:number,search:string):Observable<any>{

    this.url="?pageNumber="+pageNumber+"&pageSize="+pageSize

    if(search!='')
      this.url+="&search="+search

    return this.http.get<any>(`${ENV.apiURL}User`+this.url,httpOptions);
  }

  addUser(user: UserAdd): Observable<any> {
    return this.http.post<any>(ENV.apiURL+'User', user, httpOptions);
  }

  updateUser(user: userUpdate): Observable<any> {
    return this.http.put<any>(ENV.apiURL+'User', user, httpOptions);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${ENV.apiURL}User/${id}`,httpOptions);
  }

  UploadPhoto(val:any){
    return this.http.post(ENV.apiURL+'User/SaveFile',val,httpOptionsImage);
  }

  
}
