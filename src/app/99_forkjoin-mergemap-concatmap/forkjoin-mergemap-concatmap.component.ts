import { HttpClient } from '@angular/common/http';
import { Component, VERSION } from '@angular/core';
import { forkJoin, from, Observable } from 'rxjs';
import { concatMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-99-forkjoin-mergemap-concatmap',
  templateUrl: './forkjoin-mergemap-concatmap.component.html',
  styleUrls: ['./forkjoin-mergemap-concatmap.component.css'],
})
export class ForkjoinMergemapConcatmapComponent {
  name = 'Angular ' + VERSION.major;
  dataForkJoin: any[] = [];
  delayUrl = 'http://httpbin.org/delay/5';

  constructor(private http: HttpClient) {
    this.getDataForkJoin();
    this.getDataConcatMap();
    this.getDataaMergeMap();
  }

  getDataForkJoin() {
    // let ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // cambiar a -1 para que de error
    let ids = [1, 2, 3]; // cambiar a -1 para que de error
    let arrayOfData = [];
    for (let i = 0; i < ids.length; i++) {
      arrayOfData.push(this.getSomethingFromAnAPI(ids[i]));
    }
    forkJoin(arrayOfData).subscribe(
      (response) => {
        for (let item in Object.keys(response)) {
          this.dataForkJoin.push({
            body: response[item].body,
            title: response[item].title,
            id: response[item].id,
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSomethingFromAnAPI(id: number): any {
    return this.http.get('https://jsonplaceholder.typicode.com/posts/' + id);
  }

  dataConcatMap: any[] = [];
  getDataConcatMap() {
    let ids = [1, 2];
    this.getSomethingFromAnAPI2(ids).subscribe(
      (response) => {
        this.dataConcatMap.push({
          body: response.body,
          title: response.title,
          id: response.id,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSomethingFromAnAPI2(ids: number[]): any {
    return from(ids).pipe(
      concatMap(
        (id) =>
          <Observable<any>>(
            this.http.get('https://jsonplaceholder.typicode.com/posts/' + id)
          )
      )
    );
  }

  dataMergeMap: any[] = [];
  getDataaMergeMap() {
    let ids = [1, 2, 3, 4, -5, 6, 7, 8, 9, 10];
    this.getSomethingFromAnAPI3(ids).subscribe(
      (response) => {
        this.dataMergeMap.push({
          body: response.body,
          title: response.title,
          id: response.id,
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSomethingFromAnAPI3(ids: number[]): any {
    return from(ids).pipe(
      mergeMap(
        (id) =>
          <Observable<any>>(
            this.http.get('https://jsonplaceholder.typicode.com/posts/' + id)
          )
      )
    );
  }
}
