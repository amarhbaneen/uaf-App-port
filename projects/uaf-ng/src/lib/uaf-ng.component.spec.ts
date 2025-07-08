import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UafNgComponent } from './uaf-ng.component';

describe('UafNgComponent', () => {
  let component: UafNgComponent;
  let fixture: ComponentFixture<UafNgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UafNgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UafNgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
