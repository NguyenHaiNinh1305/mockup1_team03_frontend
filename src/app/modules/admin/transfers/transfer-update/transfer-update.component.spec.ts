import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferUpdateComponent } from './transfer-update.component';

describe('TransferUpdateComponent', () => {
  let component: TransferUpdateComponent;
  let fixture: ComponentFixture<TransferUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
