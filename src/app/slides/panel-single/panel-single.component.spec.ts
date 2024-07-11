import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelSingleComponent } from './panel-single.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('PanelSingleComponent', () => {
  let component: PanelSingleComponent;
  let fixture: ComponentFixture<PanelSingleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [PanelSingleComponent],
    providers: [
      { provide: ActivatedRoute, useValue: MockActivatedRoute },
    ]
});
    fixture = TestBed.createComponent(PanelSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
