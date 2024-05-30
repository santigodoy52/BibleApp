import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalVoiceRecognitionComponent } from './modal-voice-recognition.component';

describe('ModalVoiceRecognitionComponent', () => {
  let component: ModalVoiceRecognitionComponent;
  let fixture: ComponentFixture<ModalVoiceRecognitionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVoiceRecognitionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalVoiceRecognitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
