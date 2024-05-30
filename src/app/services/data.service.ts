import { Storage } from '@ionic/storage-angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  guardarVersion(version: string) {
    localStorage.setItem('version', version);
  }

  obtenerVersion(): string | null {
    return localStorage.getItem('version');
  }

  actualizarVersion(nuevaVersion: string): void {
    this.guardarVersion(nuevaVersion);
  }

}
