import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatDialogModule } from '@angular/material/dialog';

import { AddSlideComponent } from './add-slide.component';
import { AddSlideDialogComponent } from '../add-slide-dialog/add-slide-dialog.component';

describe('AddSlideComponent', () => {
  let component: AddSlideComponent;
  let fixture: ComponentFixture<AddSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AddSlideComponent,
        AddSlideDialogComponent,
      ],
      imports: [
        MatDialogModule,
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
    expect(component['dialog'].open).toHaveBeenCalledWith(AddSlideDialogComponent, {
      data: { index: 100 },
      height: '600px',
      width: '800px',
    });
  });

  /*  ***
      TODO: handleDialogClose Coverage
  */
});
