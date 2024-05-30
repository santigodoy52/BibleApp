import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private dataService: DataService) {
    this.setVersion();
  }

  setVersion() {
    //Inicializamos la version
    const version = 'rv1960';
    this.dataService.guardarVersion(version);
  }

}
