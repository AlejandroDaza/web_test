import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeViewPageComponent } from './real-time-view-page.component';

describe('RealTimeViewPageComponent', () => {
  let component: RealTimeViewPageComponent;
  let fixture: ComponentFixture<RealTimeViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealTimeViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealTimeViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
