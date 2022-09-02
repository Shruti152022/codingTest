import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DogsService {

  constructor(private http:HttpClient) { }
  getRandomPics():Observable<any> {

    return this.http.get("https://dog.ceo/api/breeds/image/random/10", {});
    
    }
    getAllBreeds():Observable<any> {

      return this.http.get("https://dog.ceo/api/breeds/list/all", {});
      
      }
      getRandompicsforBreed(breed: any):Observable<any> {

        return this.http.get("https://dog.ceo/api/breed/" + breed + "image/random/10", {});
        
        }
}
