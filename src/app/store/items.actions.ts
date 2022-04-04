import { createAction, props } from '@ngrx/store';
import { Item } from '../models/item';

export const get = createAction('[Items] Get',  props);
export const add = createAction('[Items] Add',  props<{item: Item}>());
export const remove = createAction('[Items] Remove', props<{id: number}>());
export const changeStatus = createAction('[Items] Change status', props<{item: Item}>());
export const changeStatusAll = createAction('[Items] Change status of all items');
export const removeAllDone = createAction('[Items] Remove all done items');
export const removeLastItem = createAction('[Items] Remove last item');