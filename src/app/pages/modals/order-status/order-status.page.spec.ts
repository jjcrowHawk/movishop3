import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalOrderStatusPage } from './order-status.page';

describe('OrderStatusPage', () => {
  let component: ModalOrderStatusPage;
  let fixture: ComponentFixture<ModalOrderStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOrderStatusPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalOrderStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
