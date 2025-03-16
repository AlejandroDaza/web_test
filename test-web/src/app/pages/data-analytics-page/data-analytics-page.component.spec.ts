import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalyticsPageComponent } from './data-analytics-page.component';

describe('DataAnalyticsPageComponent', () => {
  let component: DataAnalyticsPageComponent;
  let fixture: ComponentFixture<DataAnalyticsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataAnalyticsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAnalyticsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
