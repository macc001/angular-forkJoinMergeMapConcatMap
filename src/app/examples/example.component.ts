import { Component, OnInit } from '@angular/core';
import { from, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'examples',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExamplesComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.capitalize();
  }

  capitalize() {
    const names = ['batman', 'joker', 'doble cara'];
    const capitalizer = (nombre: string) =>
      nombre.replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
      );

    // ITERACION
    // for (let name of names) {
    //   console.log(capitalizer(name));
    // }

    // CON OBSERVABLE
    from(names)
      .pipe(map((name) => capitalizer(name)))
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
