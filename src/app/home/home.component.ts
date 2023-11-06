import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private observableId: Subscription;
  constructor() { }

  ngOnInit() {
    // this.observableId = interval(1000).subscribe((count)=>{
    //   console.log(count)
    // })

    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;

      setInterval(() => {
        observer.next(count);
        if (count === 2)
          observer.complete();
        if (count > 3) {
          observer.error(new Error("Count should be less than 3"))
        }
        count++;
      }, 1000)
    })

    // customIntervalObservable.pipe(map((data:number)=>{
    //   return `Round : ${data+1}`
    // }))

    this.observableId = customIntervalObservable.pipe(map((data: number) => {
      return `Round : ${data + 1}`
    })).subscribe((data) => {
      console.log(data)
    }, (err) => {
      console.log(err.message)
    }, () => {
      console.log("Completed")
    })
  }

  ngOnDestroy() {
    this.observableId.unsubscribe();
  }

}
