import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ResponseBook } from 'src/app/interfaces/api-bible.interface';
import { BibleService } from 'src/app/services/bible.service';

@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.scss'],
})
export class BookComponentComponent  implements OnInit {

  public parametro: string | null = null;
  public book!: ResponseBook;
  public bookName : string = '';
  public chapters: number = 0;
  public loading: boolean = false;
  public chaptersArray : number [] = [];
  public items: string[] = ['' , '', '' , '', '','', '',''];

  constructor(private route: ActivatedRoute,private bibleService : BibleService, private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    // Obtenemos el parámetro de la ruta
    this.parametro = this.route.snapshot.paramMap.get('parametro');
    this.getBook();
  }

  getBook() {
    this.bibleService.getBook(this.parametro).subscribe(
      (response) => {
        this.book = response;
        this.bookName = this.book.names[0];  
        this.chapters = this.book.chapters; 
        this.generarArray(this.chapters); 
        this.loading = false;       
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  generarArray(numero: number): void {
    this.chaptersArray = this.bibleService.generarArrayIncremental(numero);
  }

  navigateChapterComponent(parametro: string) {   
    const ruta = `tabs/tab2/chapter/${parametro}`;
    const extras: NavigationExtras = {
      state: {
        parametroExtra: this.bookName // Parámetro extra que deseas enviar
      }
    };
    this.router.navigateByUrl(ruta, extras);
  }
}
