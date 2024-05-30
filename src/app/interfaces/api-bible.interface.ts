export interface Book {
    names: string[];
    abrev: string
    chapters: number
    testament: string
}

export interface ResponseBook {
	names: string[]
	abrev: string	
	chapters: number
	testament: string
}

export interface Chapter {
    testament: string;
    name: string;
    num_chapters: number;
    chapter: number;
    vers: Verse[];
}

export interface Verse {
    verse: string;
    number: number;
    study: string;
    id: number;
}

export interface VersoBiblico {
    verse: string;
    study: string | null;
    number: number;
    id: number;
    book: string;
    chapter: number;
  }
  
  export interface RespuestaVersiculos {
    data: VersoBiblico[];
    meta: MetaData;
  }

export interface MetaData {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
}

export interface VerseOfTheDay {
  id: number;
  versiculo: string;
  capitulo: string;
}