import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Chapter } from 'src/app/interfaces/api-bible.interface';
import { BibleService } from 'src/app/services/bible.service';
import { DataService } from 'src/app/services/data.service';
import { AppFontSizeService } from 'src/app/services/fontSize.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
})
export class ChapterComponent  implements OnInit {

  @ViewChild('elementoAResaltar') elementoAResaltar!: ElementRef;
  public parametro: string | null = '';
  public chapters: number = 0;
  public loading: boolean = false;
  public items: string[] = ['' , '', '' , '', '','', '',''];
  public versesArray : number [] = [];
  public chapter!: Chapter;
  public book: string = '';
  public selectVerse : boolean = false;
  public version:string | null = '';
  public fontSize: number = 0;

  constructor(
    private route: ActivatedRoute,
    private bibleService : BibleService,
    private router: Router, 
    private toastController: ToastController,
    private dataService: DataService,
    private fontSizeService: AppFontSizeService,
    private storage: Storage) {
      this.initializeStorage();
    }

    ngOnInit():void {
    this.fontSizeService.currentFontSize.subscribe(size => this.fontSize = size);
    this.getVersion();
    this.loading = true;
    // Obtenemos el parámetro de la ruta
    this.parametro = this.route.snapshot.paramMap.get('parametro');
    const book = history.state.parametroExtra;
    this.book = book;
    
    this.getChapter(book , this.parametro);
  }

  async initializeStorage() {
    await this.storage.create();
  }

  
  async addToFavorite(verse : any) {

    const objeto = {
      title: this.book + ' - ' + this.parametro + ':' + verse.number,
      text: verse.verse,
    };
  
    // Guarda el objeto
    await this.storage.set( verse.id.toString() , objeto);

    this.presentToastFav();
  }

  async presentToastFav() {
    const toast = await this.toastController.create({
      message: 'Guardado como favorito.',
      duration: 2500,
      position: 'bottom',
      color: 'success',
      icon:'checkmark-circle-outline'
    });

    await toast.present();
  }

  getChapter( book: string , chapter : string | null ) {
    this.bibleService.getChapter(book , chapter , this.version).subscribe(
      (response) => {
        this.chapter = response;
        this.generarArray(this.chapter.vers.length); 
        this.loading = false;       
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  generarArray(numero: number): void {
    this.versesArray = this.bibleService.generarArrayIncremental(numero);
  }

  viewVerse(verseNumber: number) {
    // Marcar como seleccionado
    this.selectVerse = true;
  
    // Redirigir a la posición del elemento después de un breve tiempo
    setTimeout(() => {
      const elementId = `verse${verseNumber}`;
      const element = document.getElementById(elementId);
    
      if (element) {
        // Añadir clase de resaltado
        element.classList.add('resaltado');
    
        // Eliminar clase de resaltado después de 1 segundo
        setTimeout(() => {
          element.classList.remove('resaltado');
        }, 3000);
    
        // Redirigir a la posición del elemento
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100); // Espera 100ms
  }

  navigateBookComponent() {
    const rutaActualCompleta = this.router.url; // Obtiene la ruta actual completa
    const rutaDeseada = `${rutaActualCompleta}/book/${this.book}`; // Agrega el parámetro a la ruta específica
    this.router.navigateByUrl(rutaDeseada);
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

  getVersion() {
    //Leemos la version del localStorage
    this.version = this.dataService.obtenerVersion();
  }
  
}
