import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {
  @Input() isActive: boolean = false;

  @Output() squareClicked: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    // this.isActive = !this.isActive; // Inverse la valeur de isActive
    this.squareClicked.emit(); // Émet un événement pour notifier le composant parent
  }
}
