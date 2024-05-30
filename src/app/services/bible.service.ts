import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book, Chapter, ResponseBook, RespuestaVersiculos } from '../interfaces/api-bible.interface';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class BibleService {

  private messageSource = new BehaviorSubject<string>("");
  public currentMessage = this.messageSource.asObservable();
  public apiUrl: string = 'https://bible-api.deno.dev/api/';

  constructor(private http: HttpClient) { 
  }  

  public getBooks() {
    return this.http.get<Book[]>(this.apiUrl + 'books');
  }

  public getTestament(testament:string) {
    return this.http.get<Book[]>(this.apiUrl + 'books/' + testament);
  }

  public getBook(name:string | null) {
    return this.http.get<ResponseBook>(this.apiUrl + 'book/' + name);
  }

  public getChapter(name:string | null , chapter: string | null , version: string | null) {
    return this.http.get<Chapter>(this.apiUrl + `read/${version}/` + name + '/' + chapter);
  }

  public getChapterByKeywordBooks(keyword: string , version: string | null) {
    return this.http.get<RespuestaVersiculos>(this.apiUrl + `read/${version}/search?q=` + keyword + '&take=50');
  }

  public generarArrayIncremental(numero: number): number[] {
    const arrayIncremental: number[] = [];
    for (let i = 1; i <= numero; i++) {
      arrayIncremental.push(i);
    }
    return arrayIncremental;
  }

  changeMessage(message: string) {

    this.messageSource.next(message);
  }

}
