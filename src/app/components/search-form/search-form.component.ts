import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchFormValuesI } from 'src/app/models/types';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  @Output() searchFormValues: EventEmitter<SearchFormValuesI> = new EventEmitter<SearchFormValuesI>()

  public sortFormValues = [
    {value: 'name', viewValue: 'by name'},
    {value: 'status', viewValue: 'by status'},
  ];
  public filterFormValues = [
    {value: 'all', viewValue: 'Display all'},
    {value: 'done', viewValue: 'Display only done'},
    {value: 'undone', viewValue: 'Display only undone'},
  ];

  constructor() { }

  ngOnInit(): void {
    this.searchForm.valueChanges.subscribe( (value: SearchFormValuesI) => {
      this.searchFormValues.emit(value);
    });
  }

  public searchForm: FormGroup = new FormGroup({
    sort: new FormControl('status'),
    filter: new FormControl('all'),
    search: new FormControl('')
  });
}
