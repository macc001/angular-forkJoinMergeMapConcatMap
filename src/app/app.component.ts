import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  data: any[] = [];

  constructor(private http: HttpClient) {
    this.getData();
  }

  getData() {
    let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let arrayOfData = [];
    for (let i = 0; i < ids.length; i++) {
      arrayOfData.push(this.getSomethingFromAnAPI(ids[i]));
    }
    console.log(arrayOfData);
    forkJoin(arrayOfData).subscribe(
      (response) => {
        for (let item in Object.keys(response)) {
          this.data.push({
            body: response[item].body,
            title: response[item].title,
            id: response[item].id,
          });
        }
        console.log(this.data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSomethingFromAnAPI(id: number): any {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  public getSomethingFromAnAPI2(ids: number[]): any {
    return from(ids).pipe(
      concatMap(
        (id) =>
          <Observable<any>>(
            this.http.get('https://jsonplaceholder.typicode.com/posts/' + id)
          )
      )
    );
  }
}
