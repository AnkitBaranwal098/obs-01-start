import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription, interval, Observable} from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  private observableId:Subscription;
  constructor() { }

  ngOnInit() {
    // this.observableId = interval(1000).subscribe((count)=>{
    //   console.log(count)
    // })

    const customIntervalObservable = Observable.create((observer)=>{
      let count = 0;

      setInterval(()=>{
        observer.next(count);
        count++;
      },1000)
    })

    this.observableId = customIntervalObservable.subscribe((data)=>{
      console.log(data)
    })
  }

  ngOnDestroy(){
    this.observableId.unsubscribe();
  }

}
