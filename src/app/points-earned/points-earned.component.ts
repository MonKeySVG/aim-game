import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-points-earned',
  templateUrl: './points-earned.component.html',
  styleUrl: './points-earned.component.css'
})
export class PointsEarnedComponent {
  @Input() points!: number;
  @Input() top!: number;
  @Input() left!: number;
  visible: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.visible = false;
    }, 300); // Hide after 300ms
  }

  getPointsColor(): string {
    return this.points > 0 ? '#D80032' : '#3D0C11';
  }
}
