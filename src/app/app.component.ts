import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;

  constructor(private http:HttpClient){
    this.getData();
  }

  getData(){
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let arrayOfData = [];
    for(let i = 0; i < ids.length; i++) {
      arrayOfData.push(this.getSomethingFromAnAPI(ids[i]));
    }
    console.log(arrayOfData);
  }

  getSomethingFromAnAPI(id: number): any {
    return this.http.get(
     'https://jsonplaceholder.typicode.com/posts/' + id
    );
   }

}
