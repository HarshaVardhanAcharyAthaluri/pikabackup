import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { C4ccustomerdetailsComponent } from './c4ccustomerdetails.component';

describe('C4ccustomerdetailsComponent', () => {
  let component: C4ccustomerdetailsComponent;
  let fixture: ComponentFixture<C4ccustomerdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ C4ccustomerdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(C4ccustomerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
