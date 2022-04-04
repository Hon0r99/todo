import { createReducer, on } from '@ngrx/store';
import { Item } from '../models/item';
import { add, changeStatus, changeStatusAll, get, remove, removeAllDone, removeLastItem } from './items.actions';

export const initialState: Item[] = [];

export const itemsReducer = createReducer(
  initialState,
  on(get, (state) => [...state]),
  on(add, (state, {item}) => [item, ...state]),
  on(remove, (state, {id}) => [...state.filter(el => el.id != id)]),
  on(removeAllDone, (state) => [...state.filter(el => !el.status)]),
  on(removeLastItem, (state) => [...state.filter((item, index) => index < state.length - 1)]),
  on(changeStatus, (state, {item}) => [...state.map(el => {
    if (el.id === item.id){
      return {...item, status: !item.status}
    }else return el
  })]),
  on(changeStatusAll, (state) => [...state.map(item =>{ return {...item, status: true}})]),
);