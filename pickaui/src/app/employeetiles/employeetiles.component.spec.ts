import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeetilesComponent } from './employeetiles.component';

describe('EmployeetilesComponent', () => {
  let component: EmployeetilesComponent;
  let fixture: ComponentFixture<EmployeetilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeetilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeetilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
