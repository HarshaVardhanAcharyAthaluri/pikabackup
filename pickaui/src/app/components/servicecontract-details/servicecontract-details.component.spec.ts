import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecontractDetailsComponent } from './servicecontract-details.component';

describe('ServicecontractDetailsComponent', () => {
  let component: ServicecontractDetailsComponent;
  let fixture: ComponentFixture<ServicecontractDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecontractDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecontractDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
