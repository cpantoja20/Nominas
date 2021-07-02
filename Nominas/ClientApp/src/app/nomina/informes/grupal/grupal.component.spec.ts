import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupalComponent } from './grupal.component';

describe('GrupalComponent', () => {
  let component: GrupalComponent;
  let fixture: ComponentFixture<GrupalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
