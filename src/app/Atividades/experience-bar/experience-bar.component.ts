import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-experience-bar',
  standalone: false,

  templateUrl: './experience-bar.component.html',
  styleUrl: './experience-bar.component.css'
})
export class ExperienceBarComponent implements OnInit {
  @Input() currentExperience: number = 0;
  @Input() experienceToNextLevel: number = 600;

  get percentToNextLevel(): number {
    return (this.currentExperience / this.experienceToNextLevel) * 100;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
