import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutualizarFuncaoComponent } from './autualizar-funcao.component';

describe('AutualizarFuncaoComponent', () => {
  let component: AutualizarFuncaoComponent;
  let fixture: ComponentFixture<AutualizarFuncaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutualizarFuncaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutualizarFuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
