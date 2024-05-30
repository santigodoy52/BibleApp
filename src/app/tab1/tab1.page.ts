import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BibleService } from '../services/bible.service';
import { versiculosBiblicos } from './versiculos';
import { VerseOfTheDay } from '../interfaces/api-bible.interface';
import { ToastController } from '@ionic/angular';
import html2canvas from 'html2canvas';
import { Share } from '@capacitor/share';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild('versiculoContainer') versiculoContainer!: ElementRef;
  
  public title:String = 'Versículo del Día';
  public srcImage:String = 'assets/image/backgraund2.jpg';
  public textColor:String = 'black';
  public versiculos : VerseOfTheDay [] = versiculosBiblicos;
  public versiculoAleatorio: string = '';
  public verseDetail: string = '';

  constructor(private bibleService: BibleService, private router: Router,private toastController: ToastController,private storage: Storage) {
    this.initializeStorage();
    this.determinarHoraDelDia();
  }


  async initializeStorage() {
    await this.storage.create();
  }

  async addToFavorite() {

    const objeto = {
      title: this.verseDetail,
      text: this.versiculoAleatorio,
    };

    // Guarda el objeto
    await this.storage.set(this.generateRandomId(), objeto);

    this.presentToastFav();
  }


  ngOnInit(): void {
    this.obtenerVersiculoAleatorio();
  }

  navigateOldTestament(){
    const message = "GN";
    this.bibleService.changeMessage(message);
    this.router.navigate(['/tabs/tab2']);
  }

  navigateNewTestament(){
    const message = "MT";
    this.bibleService.changeMessage(message);
    this.router.navigate(['/tabs/tab2']);
  }

  determinarHoraDelDia(): void {
    const horaActual: number = new Date().getHours();

    if (horaActual >= 6 && horaActual < 20) {
      this.title = 'Versículo del Día';
      this.srcImage = '/assets/image/backgraund2.jpg';
      this.textColor = 'black'; 
    } else {
      this.title = 'Versículo de la noche';
      this.srcImage = '/assets/image/backgraund3.jpg';
      this.textColor = 'white';
    }
  }

  obtenerVersiculoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * this.versiculos.length);
    this.versiculoAleatorio = this.versiculos[indiceAleatorio].versiculo;
    this.verseDetail = this.versiculos[indiceAleatorio].capitulo;
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

  descargarImagenConTexto() {
    const backgroundImageURL = this.srcImage.toString();
  
    const backgroundImage = new Image();
    backgroundImage.crossOrigin = 'anonymous'; // Asegúrate de permitir el acceso a la imagen
    backgroundImage.src = backgroundImageURL;
  
    // Esperar a que la imagen de fondo se cargue
    backgroundImage.onload = () => {
      // Crear un elemento de canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
  
      // Verificar si el contexto no es nulo antes de continuar
      if (context) {
        // Obtener el tamaño de la imagen de fondo
        canvas.width = backgroundImage.width;
        canvas.height = backgroundImage.height;
  
        // Dibujar la imagen de fondo en el canvas
        context.drawImage(backgroundImage, 0, 0);
  
        // Calcular el tamaño máximo de los textos para evitar desbordamiento
        const maxWidth = canvas.width * 0.8; // Por ejemplo, el título y subtítulo ocuparán hasta el 80% del ancho de la imagen
  
        // Establecer el estilo de texto para el título
        context.fillStyle = this.textColor.toString();
        context.font = 'bold 30px Arial'; // Tamaño de fuente más pequeño para el título
        context.textAlign = 'center';
  
        // Definir el texto del título
        const titulo = this.verseDetail.toString(); // Título de la Imagen
  
        // Calcular la posición vertical del título centrado
        const tituloY = canvas.height / 2 - 30; // El texto tiene una altura de 30px
  
        // Dividir el título si es demasiado largo para ajustarse al ancho máximo
        const tituloDividido = this.dividirTexto(context, titulo, maxWidth);
  
        // Dibujar el título en el canvas
        this.dibujarTextoMultilinea(context, tituloDividido, canvas.width / 2, tituloY, maxWidth);
  
        // Establecer el estilo de texto para el subtítulo
        context.font = 'bold 20px Arial'; // Tamaño de fuente más pequeño para el subtítulo
  
        // Definir el texto del subtítulo
        const subtitulo = this.versiculoAleatorio.toString(); // Subtítulo de la Imagen
  
        // Calcular la posición vertical del subtítulo centrado
        const subtituloY = canvas.height / 2 + 20; // El texto tiene una altura de 20px
  
        // Dividir el subtítulo si es demasiado largo para ajustarse al ancho máximo
        const subtituloDividido = this.dividirTexto(context, subtitulo, maxWidth);
  
        // Dibujar el subtítulo en el canvas
        this.dibujarTextoMultilinea(context, subtituloDividido, canvas.width / 2, subtituloY, maxWidth);
  
        // Convertir el canvas en una URL de imagen
        const imagenURL = canvas.toDataURL('image/png');
  
        // Crear un enlace para descargar o compartir la imagen
        const link = document.createElement('a');
        link.href = imagenURL;
        link.download = 'versiculo.png'; // Nombre de archivo para descargar
        link.click();
      } else {
        console.error("El contexto es nulo");
      }
    };
  }
  
  dividirTexto(context: CanvasRenderingContext2D, texto: string, maxWidth: number): string[] {
    const palabras = texto.split(' ');
    const lineas: string[] = [];
    let lineaActual = palabras[0];
  
    for (let i = 1; i < palabras.length; i++) {
      const palabra = palabras[i];
      const medida = context.measureText(lineaActual + ' ' + palabra);
      if (medida.width < maxWidth) {
        lineaActual += ' ' + palabra;
      } else {
        lineas.push(lineaActual);
        lineaActual = palabra;
      }
    }
  
    lineas.push(lineaActual);
    return lineas;
  }
  
  dibujarTextoMultilinea(context: CanvasRenderingContext2D, lineas: string[], x: number, y: number, maxWidth: number) {
    for (let i = 0; i < lineas.length; i++) {
      context.fillText(lineas[i], x, y + (i * 40)); // El espacio entre líneas es de 40px
    }
  }

  async compartirVersiculo() {
    await Share.share({
      text: this.verseDetail + ' : ' + this.versiculoAleatorio,
    });
  }

  generateRandomId(): string {
    // Aquí se usa un timestamp con un número aleatorio.
    const timestamp = new Date().getTime().toString(36); // Base 36 para compactar
    const randomNum = Math.floor(Math.random() * 1e12).toString(36); // Base 36 para compactar
    return `${timestamp}-${randomNum}`;
  }
  
}
