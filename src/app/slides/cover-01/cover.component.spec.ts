import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverComponent } from './cover.component';

describe('CoverComponent', () => {
  let component: CoverComponent;
  let fixture: ComponentFixture<CoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoverComponent]
    });
    fixture = TestBed.createComponent(CoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
