import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item';

export const add = createAction('[Items] Add',  props<{item: Item}>());
export const remove = createAction('[Items] Remove', props<{item: Item}>());
export const changeStatus = createAction('[Items] Change status', props<{item: Item}>());