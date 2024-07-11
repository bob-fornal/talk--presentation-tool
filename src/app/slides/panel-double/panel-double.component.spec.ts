import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDoubleComponent } from './panel-double.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('PanelDoubleComponent', () => {
  let component: PanelDoubleComponent;
  let fixture: ComponentFixture<PanelDoubleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PanelDoubleComponent],
    providers: [
      { provide: ActivatedRoute, useValue: MockActivatedRoute },
    ]
});
    fixture = TestBed.createComponent(PanelDoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
