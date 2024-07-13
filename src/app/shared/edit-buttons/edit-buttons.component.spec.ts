import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditButtonsComponent } from './edit-buttons.component';

describe('EditButtonsComponent', () => {
  let component: EditButtonsComponent;
  let fixture: ComponentFixture<EditButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeAll(() => {
    window.onbeforeunload = jasmine.createSpy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "triggerToggleView" to toggle and emit state', () => {
    component.toggleView = false;
    spyOn(component.toggle, 'emit').and.stub();

    component.triggerToggleView();
    expect(component.toggleView).toEqual(true);
    expect(component.toggle.emit).toHaveBeenCalledWith(true);
  });
});
