import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Share } from '@capacitor/share';
import { AppFontSizeService } from '../services/fontSize.service';

@Component({
  selector: 'app-tab5',
  templateUrl: 'tab5.page.html',
  styleUrls: ['tab5.page.scss']
})
export class Tab5Page implements OnInit{

  public fontSize: number = 0;
  public favs: any [] = [];

  constructor(private storage: Storage , private alertController: AlertController, private toastController: ToastController,  private fontSizeService: AppFontSizeService) {
    this.fontSizeService.currentFontSize.subscribe(size => this.fontSize = size);
    this.initializeStorage();
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  ionViewWillEnter(): void {
    //Cada vez que se abre la vista se ejecuta.
    this.cargarDatos();
  }

  async initializeStorage() {
    await this.storage.create();
  }

  async leerDato() {
    const objeto = await this.storage.get('miObjeto');
  }

  // Recupera y muestra todos los objetos guardados
  async cargarDatos() {
    const keys = await this.storage.keys();
    const objetos = [];

    for (const key of keys) {
      const objeto = await this.storage.get(key);
      objetos.push({ key, objeto });
    }

    this.favs = objetos;
  }

  async eliminarDato(key: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar de favoritos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.cargarDatos();
          }
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.storage.remove(key);
            this.cargarDatos();  // Actualiza la lista después de eliminar el dato
          }
        }
      ]
    });

    await alert.present();
  }

  copyText(text: string) {
    // Crea un elemento temporal para copiar el texto
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
  
    // Selecciona el texto y copia al portapapeles
    tempInput.select();
    document.execCommand('copy');
  
    // Elimina el elemento temporal
    document.body.removeChild(tempInput);

    this.presentToast();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Texto copiado al portapapeles.',
      duration: 2500,
      position: 'bottom',
      color: 'success',
      icon:'checkmark-circle-outline'
    });

    await toast.present();
  }

  async compartirVersiculo(verse : any) {
    await Share.share({
      text: verse.title + ' : ' + verse.text,
    });
  }

}
