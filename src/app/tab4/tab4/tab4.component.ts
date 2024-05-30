import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IonInput, ModalController, ToastController } from '@ionic/angular';
import { Book, MetaData, RespuestaVersiculos, VersoBiblico } from 'src/app/interfaces/api-bible.interface';
import { BibleService } from 'src/app/services/bible.service';
import { ModalVoiceRecognitionComponent } from './modal-voice-recognition/modal-voice-recognition.component';
import { DataService } from 'src/app/services/data.service';
import { AppFontSizeService } from 'src/app/services/fontSize.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.component.html',
  styleUrls: ['./tab4.component.scss'],
})
export class Tab4Component implements OnInit{

  @ViewChild('ring') ring!: ElementRef;
  @ViewChild('inputSearch') inputSearch!: IonInput; 
  public loading : boolean = false;
  public items: string[] = ['' , '', '' , '', '','', '',''];
  public verse!: VersoBiblico[];
  public response! : RespuestaVersiculos;
  public metaData! : MetaData;
  public inputData :string = '';
  public version:string | null = '';
  public fontSize: number = 0;
  public voiceToString: string = '';
  public recording: boolean = false;
  public labelModal: string = 'Presione para comenzar...';
  public recognition: any;

  constructor(
    private bibleService : BibleService,
    private toastController: ToastController,
    private modalController: ModalController,
    private dataService: DataService,
    private fontSizeService: AppFontSizeService,
    private cdr: ChangeDetectorRef) { 
    }

  ngOnInit() {
    this.fontSizeService.currentFontSize.subscribe(size => this.fontSize = size);
    this.getVersionLocalStorage();
  }

  async searchByKeyword(keyword: string) {

    this.loading = true;

    await this.bibleService.getChapterByKeywordBooks(keyword,this.version).subscribe(
      (response) => {
        this.response = response;
        this.verse = this.response.data;
        this.metaData = this.response.meta;
        //this.originalBooks = response;
        this.loading = false;
        this.cdr.detectChanges(); 
      },
      (error) => {
        this.loading = false;
      }
    );
  } 

  filterBooks(event: any) { 
    const value = event.target.value;  
    this.inputData = value;

    this.searchByKeyword(this.inputData);
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

  async presentToastInfo() {
    const toast = await this.toastController.create({
      message: 'Intente grabar nuevamente.',
      duration: 2500,
      position: 'bottom',
      color: 'primary',
      icon:'information-circle-outline'
    });

    await toast.present();
  }

  startListening() {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.lang = 'es'; // Establece el idioma, puedes cambiarlo según tus necesidades
      recognition.start();

      recognition.onresult = (event:any) => {
          const speechToText = event.results[0][0].transcript;
          this.voiceToString = speechToText;
          console.log(speechToText); // Texto reconocido
      };

      recognition.onerror = (event:any) => {
        console.error('Error en el reconocimiento de voz:', event.error);
      };

    }else {
      console.error('El reconocimiento de voz no está soportado en este navegador.');
    }    
  }

  botonPresionado() {
    this.voiceToString = '';

    if ('webkitSpeechRecognition' in window) {
      // Verifica si el reconocimiento de voz ya está inicializado
      if (!this.recognition) {
        this.recognition = new webkitSpeechRecognition();
        this.recognition.lang = 'es'; // Establece el idioma, puedes cambiarlo según tus necesidades
  
        this.recognition.onresult = (event: any) => {
          const speechToText = event.results[0][0].transcript;
          this.voiceToString = speechToText;
          console.log(speechToText); // Texto reconocido
        };
  
        this.recognition.onerror = (event: any) => {
          console.error('Error en el reconocimiento de voz:', event.error);
        };
  
        this.recognition.onend = this.handleRecordingEnd;
      }
      // Comenzar a escuchar
      this.recording = true;
      this.labelModal = 'Escuchando...';
  
      const element = this.ring.nativeElement;
      element.classList.toggle('ringAnimation');
  
      this.recognition.start();
      console.log('Botón presionado');
    } else {
      console.error('El reconocimiento de voz no está soportado en este navegador.');
    }
  }
  
  // Función para manejar el final de la grabación
  handleRecordingEnd = () => {
    this.recording = false;
    this.labelModal = 'Presione para comenzar...';
    this.closeModal();
    this.inputData = this.voiceToString;
    this.inputSearch.value = this.voiceToString;

    if(this.voiceToString === ''){
      this.presentToastInfo();
    }else{
      this.searchByKeyword(this.voiceToString);
    }
  };
  
  botonLiberado() {
    if (this.recording && this.recognition) {
      // Detener el reconocimiento de voz solo si está grabando
      this.recording = false;
      this.labelModal = 'Presione para comenzar...';
  
      const element = this.ring.nativeElement;
      element.classList.toggle('ringAnimation');
  
      this.recognition.stop();
    }
  }

  async closeModal() {
    await this.modalController.dismiss(); // Cierra el modal
  }
  
  async getVersionLocalStorage() {
    try {
      this.version = this.dataService.obtenerVersion();;
    } catch (error) {}
  }

}
