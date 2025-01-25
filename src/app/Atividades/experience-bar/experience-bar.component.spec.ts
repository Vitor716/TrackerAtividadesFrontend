import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceBarComponent } from './experience-bar.component';

describe('ExperienceBarComponent', () => {
  let component: ExperienceBarComponent;
  let fixture: ComponentFixture<ExperienceBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExperienceBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
