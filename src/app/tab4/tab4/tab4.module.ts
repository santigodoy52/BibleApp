import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';
import { Tab4PageRoutingModule } from './tab4-routing.module';
import { Tab4Component } from './tab4.component';
import { ModalVoiceRecognitionComponent } from './modal-voice-recognition/modal-voice-recognition.component';
import { IonicStorageModule } from '@ionic/storage-angular';


@NgModule({
  declarations: [
    Tab4Component,
    ModalVoiceRecognitionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ExploreContainerComponentModule,
    Tab4PageRoutingModule,
    IonicStorageModule.forRoot()
  ]
})
export class Tab4Module { }

