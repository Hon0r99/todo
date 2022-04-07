import { Component, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item!: Item;
  @Input() itemKey!: string;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
  }

  public remove(): void{
    this.firebase.removeItem(this.item.key)
  }
  public changeStatus(): void{
    this.firebase.changeStatus(this.item)
  }
}
