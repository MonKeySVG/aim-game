import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrl: './square.component.css'
})
export class SquareComponent {
  @Input() isActive: boolean = false;
  @Input() isError: boolean = false;

  @Output() squareClicked: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  onClick(event: MouseEvent): void {
    this.squareClicked.emit(event);
  }

  getErrorColor(): string {
    if (this.isError) {
      return 'red'; // Si error est vrai, retourne la couleur rouge
    } else {
      return this.isActive ? 'black' : 'white'; // Sinon, retourne noir si isActive est vrai, sinon blanc
    }
  }
}
