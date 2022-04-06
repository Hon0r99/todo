import { Pipe, PipeTransform } from '@angular/core';
import { Item } from '../models/item';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Item[], filterType: string): Item[] {
    let itemsForFilter: Item[] = [...items];
    if (filterType === 'done') {
      return itemsForFilter.filter(item => item.status);
    }else if (filterType === 'undone') {
      return itemsForFilter.filter(item => !item.status);
    } return itemsForFilter;
  }
}
