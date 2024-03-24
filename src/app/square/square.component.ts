import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {
  @Input() isActive: boolean = false;
}
