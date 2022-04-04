import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { add } from 'src/app/store/items.actions';
import { Item } from '../../models/item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public allItems: Item[] = [
    {name: 'Card 1', description: 'DO this', status: false},
    {name: 'Card 2', description: 'DO this', status: false},
  ];

  constructor(private store: Store <{items: Item[]}>) {
    store.select('items').subscribe((data)=> {
      this.allItems = data;
    })
  }

  ngOnInit(): void {

  }

  public newItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  
  public addItem (): void{
    this.store.dispatch(add({item : {name: this.newItemForm.value.name, description: this.newItemForm.value.description, status: false}}))
    this.newItemForm.reset()

  }
}
