import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BibleService } from '../services/bible.service';
import { Book } from '../interfaces/api-bible.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AppFontSizeService } from '../services/fontSize.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  public books!: Book[];
  public items: string[] = ['' , '', '' , '', '','', '',''];
  public viewCards: boolean = true;
  public loading: boolean = false;
  public parametro!: string;
  filteredBooks: Book[] = [];
  public originalBooks: Book[] = [];
  public selectedSegment: string | null = null; 
  public receivedMessage: string = "";
  public inputData:string = "";
  public fontSize: number = 0;

  constructor(private bibleService : BibleService, private router: Router,private fontSizeService: AppFontSizeService) {}

  ngOnInit(): void {
    this.fontSizeService.currentFontSize.subscribe(size => this.fontSize = size);
    this.getBooks();

    //Recepto mensaje enviado desde el tab1 
    this.bibleService.currentMessage.subscribe(message => {
      this.receivedMessage = message;
      this.viewTestament(this.receivedMessage);
    });
    
  }

  getBooks() {
    this.loading = true;

    this.bibleService.getBooks().subscribe(
      (response) => {
        this.books = response;
        this.originalBooks = response;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  viewTestament(book: string) {
    // Redirigir a la posición del elemento después de un breve tiempo
    setTimeout(() => {
      const elementId = `book${book}`;
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

  getOldTestament(){
    this.books = [];
    this.loading = true;

    this.bibleService.getTestament('oldTestament').subscribe(
      (response) => {
        this.loading = false;
        this.viewCards = false;
        this.books = response;
        this.originalBooks = response; 
        this.selectedSegment = 'primary'; 
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getNewTestament(){
    this.books = [];
    this.loading = true;

    this.bibleService.getTestament('newTestament').subscribe(
      (response) => {
        this.loading = false;
        this.viewCards = false;
        this.books = response;
        this.originalBooks = response; 
        this.selectedSegment = 'segment';
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  filterBooks(event: any) {   
    
    const value = event.target.value;
    this.inputData = value;

    if (!value || value.trim() === '') {
      this.books = this.originalBooks.slice(); // Restaurar libros filtrados al original
      return;
    }

    const filterValue = value.toLowerCase().trim();
    this.books = this.originalBooks.filter(book =>
      book.names.some(name => name.toLowerCase().includes(filterValue)) ||
      book.abrev.toLowerCase().includes(filterValue)
    );
  }

  navigateBookComponent(parametro: string) {
    const rutaActualCompleta = this.router.url; // Obtiene la ruta actual completa
    const rutaDeseada = `${rutaActualCompleta}/book/${parametro}`; // Agrega el parámetro a la ruta específica
    this.router.navigateByUrl(rutaDeseada);
  }

}
