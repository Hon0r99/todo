import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Item } from 'src/app/models/item';
import { changeStatus, remove } from 'src/app/store/items.actions';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() item!: Item;
  
  constructor(private store: Store<{item: Item[]}>) { }

  ngOnInit(): void {
  }

  public remove(): void{
    this.store.dispatch(remove({item: this.item}))
  }
  public changeStatus(): void{
    this.store.dispatch(changeStatus({item: this.item}))
  }
}
