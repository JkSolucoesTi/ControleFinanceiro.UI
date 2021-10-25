import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovafuncaoComponent } from './novafuncao.component';

describe('NovafuncaoComponent', () => {
  let component: NovafuncaoComponent;
  let fixture: ComponentFixture<NovafuncaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovafuncaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovafuncaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
