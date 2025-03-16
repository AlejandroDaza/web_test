import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionsPageComponent } from './detections-page.component';

describe('DetectionsPageComponent', () => {
  let component: DetectionsPageComponent;
  let fixture: ComponentFixture<DetectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetectionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
