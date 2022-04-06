export type sortType = 'name' | 'status';
export type filterType = 'done' | 'undone' | 'all';

export interface SearchFormValuesI {
    sort: sortType,
    filter: filterType,
    search: string,
}