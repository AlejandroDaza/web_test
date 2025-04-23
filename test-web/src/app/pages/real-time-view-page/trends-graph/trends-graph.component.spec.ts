import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsGraphComponent } from './trends-graph.component';

describe('TrendsGraphComponent', () => {
  let component: TrendsGraphComponent;
  let fixture: ComponentFixture<TrendsGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrendsGraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrendsGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
