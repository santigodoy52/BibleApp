import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-voice-recognition',
  templateUrl: './modal-voice-recognition.component.html',
  styleUrls: ['./modal-voice-recognition.component.scss'],
})
export class ModalVoiceRecognitionComponent  implements OnInit {

  @Input() modalWidth!: string;
  @Input() modalHeight!: string;
  
  constructor(private modalController: ModalController) {}

  ngOnInit() {
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
