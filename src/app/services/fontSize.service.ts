// app-font-size.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppFontSizeService {
  private fontSize = new BehaviorSubject<number>(18); // Valor predeterminado de tamaño de fuente
  currentFontSize = this.fontSize.asObservable();

  constructor() { }

  changeFontSize(size: number) {
    this.fontSize.next(size);
  }
}
