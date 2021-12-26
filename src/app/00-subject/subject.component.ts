import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs';

@Component({
  selector: 'app-00-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css'],
})
export class SubjectComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  subjectMethod() {
    const observer: Observer<any> = {
      next: (value) => {
        console.log('value', value);
      },
      error: (value) => {
        console.log('error', value);
      },
      complete: () => {
        console.log('complete');
      },
    };

    const interval$ = new Observable<number>((subscription) => {
      const intervalId = setInterval(() => {
        subscription.next(Math.random()), 5000;
      });
      return () => {
        clearInterval(intervalId);
      };
    });

    /**
     * casteo multiple
     * tambien es un observer
     * next, errror y complete
     */
    const subject$ = new Subject();
  }
}
