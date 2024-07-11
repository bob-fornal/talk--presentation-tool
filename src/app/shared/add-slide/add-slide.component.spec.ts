import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSlideComponent } from './add-slide.component';

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
});
