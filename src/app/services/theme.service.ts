// theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkTheme = new BehaviorSubject<boolean>(false); // Valor predeterminado: tema claro
  isDarkTheme = this.darkTheme.asObservable();

  constructor() {}

  // Cambiar al tema oscuro
  activateDarkTheme(): void {
    this.darkTheme.next(true);
  }

  // Cambiar al tema claro
  activateLightTheme(): void {
    console.log('ss');
    this.darkTheme.next(false);
  }
}
