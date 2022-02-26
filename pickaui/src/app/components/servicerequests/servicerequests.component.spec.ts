import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicerequestsComponent } from './servicerequests.component';

describe('ServicerequestsComponent', () => {
  let component: ServicerequestsComponent;
  let fixture: ComponentFixture<ServicerequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicerequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicerequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
