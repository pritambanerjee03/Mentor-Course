import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events = []

  constructor(private _eventService: EventService, private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {    
    this._eventService.getEvents()
      .subscribe(
        res => this.events = res,
        err => console.log(err),
      )
  }

  enrollCourse (event, userId) {
    //console.log('**********'+userId);
    event.studentId= userId;
    this._eventService.enrollCourse(event)
    .subscribe(
      res => {
        console.log('Have')
        this._router.navigate(['/special'])
      } ,
      
      err => console.log(err) 
    )

  }

}
