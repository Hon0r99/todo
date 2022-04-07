import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable, take, tap } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  items!: Observable<any[]>;
  constructor(private db: AngularFireDatabase) {
    this.items = db.list<Item[]>('notes').snapshotChanges()
    .pipe(map((items => {
      return items.map((a: any) => {
        const data: Item = a.payload.val();
        const key: string = a.payload.key;
        return {...data, key: key}
      })
    })))
  }

  getData(){
    return this.items
  }

  public addItem(item: any){
    this.db.list('notes').push(item);
  }

  public removeItem(key: string):void {
    this.db.list('notes').remove(key);
  }

  public removeAllDone():void {
    let subs = this.items.subscribe((data: Item[]) => {
        for (let i = 0; i < data.length; i++){
          if (data[i].status) {
            this.removeItem(data[i].key)
          }
        }
        subs.unsubscribe()
    })
  }
  public removeAll():void {
    let subs = this.items.pipe(
      tap((data: Item[]) => {
              let timer = setInterval(() => {
                if (data.length !== 0){
                  this.removeItem(data[data.length - 1].key)
                }else {
                  clearInterval(timer)
                  subs.unsubscribe()
                }
              },1000)  
        })
    ).subscribe()
  }

  public changeStatus(item: Item){
    this.db.list('notes').update(item.key, {status: !item.status})
  }
  public changeStatusAll(){
    let subs = this.items.subscribe((data: Item[]) => {
      for (let i = 0; i < data.length; i++){
        if (!data[i].status) {
          this.changeStatus(data[i])
        }
      }
      subs.unsubscribe()
  })
  }
}

