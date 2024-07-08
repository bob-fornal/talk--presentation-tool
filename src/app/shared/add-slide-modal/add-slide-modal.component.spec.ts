import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlideModalComponent } from './add-slide-modal.component';

describe('AddSlideModalComponent', () => {
  let component: AddSlideModalComponent;
  let fixture: ComponentFixture<AddSlideModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSlideModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSlideModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
