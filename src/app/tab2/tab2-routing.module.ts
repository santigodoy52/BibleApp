import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { BookComponentComponent } from './book/book-component/book-component.component';
import { ChapterComponent } from './chapter/chapter.component';
import { VerseComponent } from './verse/verse.component';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'book/:parametro',
    component: BookComponentComponent
  },
  {
    path: 'chapter/:parametro',
    component: ChapterComponent
  },
  {
    path: 'verse/:parametro',
    component: VerseComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
