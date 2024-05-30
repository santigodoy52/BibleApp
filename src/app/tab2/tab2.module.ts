import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab2PageRoutingModule } from './tab2-routing.module';
import { BookComponentComponent } from './book/book-component/book-component.component';
import { ChapterComponent } from './chapter/chapter.component';
import { VerseComponent } from './verse/verse.component';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: 
  [
    Tab2Page,
    BookComponentComponent,
    ChapterComponent,
    VerseComponent
  ]
})
export class Tab2PageModule {}
