import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentTastyComponent } from './component-tasty.component';

describe('ComponentTastyComponent', () => {
  let component: ComponentTastyComponent;
  let fixture: ComponentFixture<ComponentTastyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentTastyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentTastyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
