import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerVisionPageComponent } from './computer-vision-page.component';

describe('ComputerVisionPageComponent', () => {
  let component: ComputerVisionPageComponent;
  let fixture: ComponentFixture<ComputerVisionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComputerVisionPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerVisionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
