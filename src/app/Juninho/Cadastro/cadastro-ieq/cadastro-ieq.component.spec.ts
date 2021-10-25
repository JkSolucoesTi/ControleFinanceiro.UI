import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroIEQComponent } from './cadastro-ieq.component';

describe('CadastroIEQComponent', () => {
  let component: CadastroIEQComponent;
  let fixture: ComponentFixture<CadastroIEQComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroIEQComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroIEQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
