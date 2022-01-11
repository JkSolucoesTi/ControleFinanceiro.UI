import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemganhosComponent } from './listagemganhos.component';

describe('ListagemganhosComponent', () => {
  let component: ListagemganhosComponent;
  let fixture: ComponentFixture<ListagemganhosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemganhosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemganhosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
