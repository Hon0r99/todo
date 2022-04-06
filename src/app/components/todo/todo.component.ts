import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SearchFormValuesI, sortType } from 'src/app/models/types';
import { add, changeStatusAll, get, removeAllDone, removeLastItem } from 'src/app/store/items.actions';
import { Item } from '../../models/item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public items$!: Observable<Item[]>;
  public idCounter: number = 1;

  public searchFormValues: SearchFormValuesI =  {
    sort: 'status',
    filter: 'all',
    search: '',
  };

  constructor(private store: Store <{items: Item[]}>) {}

  ngOnInit(): void {
    this.items$ = this.store.select('items');
  }

  public newItemForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  public chooseSortAndFilterType(searchFormValues: SearchFormValuesI): void{
    this.searchFormValues.sort = searchFormValues.sort;
    this.searchFormValues.filter = searchFormValues.filter;
    this.searchFormValues.search = searchFormValues.search;
  }

  public addItem(): void{
    this.store.dispatch(add({item : {
      name: this.newItemForm.value.name,
      description: this.newItemForm.value.description,
      status: false, id: this.idCounter
    }}));
    this.newItemForm.reset();
    this.idCounter ++;
  }

  public removeAllDone(): void{
    this.store.dispatch(removeAllDone());
  }

  public removeAll(): void{
    setInterval(() => {
      this.store.dispatch(removeLastItem());
    },1000)
  }


  public changeStatusAll(): void{
    this.store.dispatch(changeStatusAll());
  }
  
}
