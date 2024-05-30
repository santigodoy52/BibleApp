import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NetworkStatusService } from '../services/online.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  isOnline: boolean = true;

  constructor(private networkStatusService: NetworkStatusService, private alertController: AlertController) {}

  async ngOnInit(): Promise<void> {
    this.isOnline = this.networkStatusService.isOnline;
    this.networkStatusService.onlineStatus$.subscribe(async status => {
      this.isOnline = status;
      if (!status) {
        const alert = await this.alertController.create({
          header: 'Información',
          message: 'Recuerde que debe estar conectado a internet.',
          buttons: [
            {
              text: 'Cerrar',
              role: 'cancel',
              handler: () => {}
            }
          ]
        });

        await alert.present();
      }
    });
  }

}

