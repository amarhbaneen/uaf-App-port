import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UafComponentsComponent } from './uaf-components.component';

describe('UafComponentsComponent', () => {
  let component: UafComponentsComponent;
  let fixture: ComponentFixture<UafComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UafComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UafComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
