import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlideComponent } from './add-slide.component';
import { AddSlideModalComponent } from '../add-slide-modal/add-slide-modal.component';

import { MatDialogModule } from '@angular/material/dialog';

describe('AddSlideComponent', () => {
  let component: AddSlideComponent;
  let fixture: ComponentFixture<AddSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AddSlideComponent,

        MatDialogModule,
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "handleAddSlide" to open the dialog', () => {
    const event: any = {
      preventDefault: () => ({}),
    };
    component.index = 100;
    spyOn(component['dialog'], 'open').and.callThrough();

    component.handleAddSlide(event);
    expect(component['dialog'].open).toHaveBeenCalledWith(AddSlideModalComponent, {
      data: { index: 100 },
      height: '600px',
      width: '800px',
    });
  });

  /*  ***
      TODO: handleDialogClose Coverage
  */
});
