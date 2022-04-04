import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor() { }

  ngOnInit(): void {
  }

  public newItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  public get items (): Item[]{
    return this.allItems;
  }

  public addItem (): void{
    this.allItems.unshift(
      {name: this.newItemForm.value.name, description: this.newItemForm.value.description, status: false}
    );
    this.newItemForm.reset()
  }
}
