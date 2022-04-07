import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchFormValuesI, sortType } from 'src/app/models/types';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  public items$!: Observable<Item[]>;

  public searchFormValues: SearchFormValuesI =  {
    sort: 'status',
    filter: 'all',
    search: '',
  };

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.items$ = this.firebase.getData();
    },6000)
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
    this.firebase.addItem({
      name: this.newItemForm.value.name,
      description: this.newItemForm.value.description,
      status: false,
    })
    this.newItemForm.reset()
  }

  public removeAllDone(): void{
    this.firebase.removeAllDone()
  }

  public removeAll(): void{
    this.firebase.removeAll();
  }

  public changeStatusAll(): void{
    this.firebase.changeStatusAll();
  }
  
}
