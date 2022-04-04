import { Component, Input, OnInit } from '@angular/core';

type ButtonType = 'standard' | 'remove'

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() type: ButtonType = 'standard';
  @Input() title!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
