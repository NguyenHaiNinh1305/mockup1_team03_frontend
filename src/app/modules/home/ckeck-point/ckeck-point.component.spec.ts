import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CkeckPointComponent } from './ckeck-point.component';

describe('CkeckPointComponent', () => {
  let component: CkeckPointComponent;
  let fixture: ComponentFixture<CkeckPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CkeckPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CkeckPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
