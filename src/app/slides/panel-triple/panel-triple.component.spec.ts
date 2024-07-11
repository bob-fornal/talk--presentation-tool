import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelTripleComponent } from './panel-triple.component';

import { ActivatedRoute } from '@angular/router';
import { MockActivatedRoute } from 'src/app/_spec/mock-activated-route.spec';

describe('PanelTripleComponent', () => {
  let component: PanelTripleComponent;
  let fixture: ComponentFixture<PanelTripleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelTripleComponent],
      providers: [
        { provide: ActivatedRoute, useValue: MockActivatedRoute },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelTripleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
