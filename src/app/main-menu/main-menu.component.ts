import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.css'
})
export class MainMenuComponent {
  @Output() playClicked: EventEmitter<void> = new EventEmitter<void>();
  onClickPlay() {
    this.playClicked.emit();
  }
}
