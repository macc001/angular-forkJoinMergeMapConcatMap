import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-02-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css'],
})
export class OperatorsComponent implements OnInit {
  constructor() {
    // this.operatorMap();
    // this.operatorFilter();
    this.operatorTap();
  }

  ngOnInit() {}

  data = {
    name: 'juan',
    lastName: 'damian',
    yearOld: 50,
  };
  operatorMap() {
    const obs$ = of(this.data).pipe(
      map((record) => {
        return {
          fullName: `${record.name} ${record.lastName} Tiene ${record.yearOld}`,
        };
      })
    );
    obs$.subscribe((resp) => {
      console.log(resp);
    });
  }

  person = [{ name: 'juan' }, { name: 'matias' }, { name: 'pedro' }];
  operatorFilter() {
    // const obs$ = from(this.person).pipe(
    const obs$ = of(...this.person).pipe(
      filter((record) => {
        return record.name === 'juan';
      })
    );
    obs$.subscribe((resp) => {
      console.log(resp);
    });
  }

  operatorTap() {
    const obs$ = from(this.person).pipe(
      // tap((record) => {
      //   console.log(record);
      // }),
      tap({
        next: (value) => {
          console.log(value);
        },
        complete: () => {
          console.log('complete');
        },
      }),
      filter((record) => {
        return record.name === 'juan';
      })
    );
    obs$.subscribe((resp) => {
      console.log(resp);
    });
  }
}
