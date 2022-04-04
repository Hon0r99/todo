import { createReducer, on } from '@ngrx/store';
import { Item } from '../models/item';
import { add, changeStatus, remove } from './items.actions';

export const initialState: Item[] = [];

export const itemsReducer = createReducer(
  initialState,
  on(add, (state, {item}) => [item, ...state]),
  on(remove, (state, {item}) => [...state.filter(el => el != item)]),
  on(changeStatus, (state, {item}) => [...state.filter(el => el != item), {...item, status: !item.status}])
);