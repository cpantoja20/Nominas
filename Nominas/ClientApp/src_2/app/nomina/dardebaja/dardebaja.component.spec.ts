import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DardebajaComponent } from './dardebaja.component';

describe('DardebajaComponent', () => {
  let component: DardebajaComponent;
  let fixture: ComponentFixture<DardebajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DardebajaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DardebajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
