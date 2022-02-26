import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicecontractsComponent } from './servicecontracts.component';

describe('ServicecontractsComponent', () => {
  let component: ServicecontractsComponent;
  let fixture: ComponentFixture<ServicecontractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServicecontractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicecontractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
