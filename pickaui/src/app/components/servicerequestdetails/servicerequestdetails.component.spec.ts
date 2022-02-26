import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerequestdetailsComponent } from './servicerequestdetails.component';

describe('ServicerequestdetailsComponent', () => {
  let component: ServicerequestdetailsComponent;
  let fixture: ComponentFixture<ServicerequestdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicerequestdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicerequestdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
