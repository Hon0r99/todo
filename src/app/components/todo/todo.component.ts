import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { add, changeStatusAll, get, removeAllDone, removeLastItem } from 'src/app/store/items.actions';
import { Item } from '../../models/item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public allItems: Item[] = [];
  public idCounter: number = 1;

  public sortForm = [
    {value: 'name', viewValue: 'by name'},
    {value: 'status', viewValue: 'by status'},
  ];

  public sortType: 'name' | 'status' = 'status'

  constructor(private store: Store <{items: Item[]}>) {
    store.select('items').subscribe((data)=> {
      this.allItems = data;
      this.sortItems();
    })
  }

  ngOnInit(): void {
    this.filterAndSearchForm.get('sort')?.valueChanges.subscribe(value => {
      this.sortType = value;
      this.sortItems();
    })

    this.filterAndSearchForm.get('search')?.valueChanges.subscribe(value => {
      if (value !== ''){
        this.allItems = this.allItems.filter(item => {
          return item.name.toLowerCase().includes(value.toLowerCase()) || item.description.toLowerCase().includes(value.toLowerCase());
        })
      }else {
        this.store.dispatch(get())
      }
    })
  }

  public newItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })
  public filterAndSearchForm: FormGroup = new FormGroup({
    sort: new FormControl(''),
    search: new FormControl('')
  })

  public sortItems(): void{
    this.sortType === 'status'
      ? this.allItems = [ ...this.allItems.filter(item => !item.status), ...this.allItems.filter(item => item.status)]
      : this.allItems = [...this.allItems.sort((a, b) => {
          if (a.name > b.name) {
            return -1
          }
          if (a.name < b.name) {
            return 1
          }
          return 0
        })]
  }

  public addItem(): void{
    this.store.dispatch(add({item : {
      name: this.newItemForm.value.name,
      description: this.newItemForm.value.description,
      status: false, id: this.idCounter
    }}));
    this.newItemForm.reset();
    this.idCounter ++
  }

  public removeAllDone(): void{
    this.store.dispatch(removeAllDone())
  }

  public removeAll(): void{
    setInterval(() => {
      this.store.dispatch(removeLastItem())
    },1000)
  }


  public changeStatusAll(): void{
    this.store.dispatch(changeStatusAll())
  }
  
}
