import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EditNotesDialogComponent } from './edit-notes-dialog.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

describe('EditNotesDialogComponent', () => {
  let component: EditNotesDialogComponent;
  let fixture: ComponentFixture<EditNotesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        EditNotesDialogComponent
      ],
      imports: [
        BrowserAnimationsModule,

        MatButtonModule,
        MatDialogModule,
        MatInputModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: () => ({}) } },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditNotesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expects "cancel" to close the dialog', () => {
    spyOn(component.dialogRef, 'close').and.stub();

    component.cancel();
    expect(component.dialogRef.close).toHaveBeenCalledWith({ type: 'cancel' });
  });

  it('expects "save" to close the dialog', () => {
    const data: any = { notes: 'NOTES' };
    spyOn(component.dialogRef, 'close').and.stub();
    component.data = data;

    component.save();
    expect(component.dialogRef.close).toHaveBeenCalledWith({ type: 'save', data });
  });

  it('expects "handleNotesChange" to set the notes on data', () => {
    const data: any = 'NOTES';
    component.data = {};

    component.handleNotesChange(data);
    expect(component.data).toEqual({ notes: data });
  });
});
