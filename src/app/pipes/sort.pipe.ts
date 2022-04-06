import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(items: Item[], sortType: string): Item[] {
    let itemsForSort: Item[] = [...items];
    sortType === 'status'
    ? itemsForSort = [ ...itemsForSort.filter(item => !item.status), ...itemsForSort.filter(item => item.status)]
    : itemsForSort = [...itemsForSort.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        }
        if (a.name < b.name) {
          return 1;
        }
        return 0;
      })];
    return itemsForSort;
  }
}
