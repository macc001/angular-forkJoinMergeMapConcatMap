import { Component, OnInit } from '@angular/core';
import { asyncScheduler, from, fromEvent, of, timer } from 'rxjs';

@Component({
  selector: 'app-01-create-observers',
  templateUrl: './create-observers.component.html',
  styleUrls: ['./create-observers.component.css'],
})
export class CreateObserversComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    // this.observerOf();
    // this.observerFronEvent();
    // this.observerTimer();
    // this.asyncShedulerF();
    this.asyncShedulerFrom();
  }

  observerOf() {
    const obs$ = of(
      ...[1, 2, 3],
      { hola: 'hola' },
      [9, 10, 11],
      true,
      function () {},
      Promise.resolve(true),
      2
    );

    obs$.subscribe((resp) => {
      console.log(resp);
    });
  }

  src$1 = fromEvent<MouseEvent>(document, 'click');
  src$2 = fromEvent(document, 'keyup');
  observerFronEvent() {
    const observer = {
      next: (resp) => {
        console.log('next ', resp);
      },
    };
    this.src$1.subscribe(observer);
    this.src$2.subscribe((resp) => {
      console.log(resp);
    });
  }

  observerTimer() {
    const now = new Date();
    now.setSeconds(now.getSeconds() + 2);
    const observer = {
      next: (resp) => {
        console.log('next ', resp);
      },
    };
    const timer$ = timer(now);
    timer$.subscribe(observer);
    timer$.subscribe((resp) => {
      console.log(resp);
    });
  }

  asyncShedulerF() {
    const hello = () => console.log('hello');
    const hello2 = (name) => console.log('hello ' + name);

    asyncScheduler.schedule(hello, 2000);
    asyncScheduler.schedule(hello2, 2000, 'Juan');
  }

  asyncShedulerFrom() {
    const source$ = from(fetch('https://jsonplaceholder.typicode.com/posts/5'));

    source$.subscribe(async (resp) => {
      console.log(resp);

      const data = await resp.json();
      console.log(data);
    });
  }
}
