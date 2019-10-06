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
  errorServerMessageEvents: String = null;
  constructor(private _eventService: EventService, private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {    
    this._eventService.getEvents()
      .subscribe(
        res => {this.events = res;
         // console.log(this.events)
        },
        err => console.log(err),
      )
  }

  enrollCourse (event, userId) {
    //console.log('**********'+userId);
    event.studentId= userId;
    this._eventService.enrollCourse(event)
    .subscribe(
      res => {
        localStorage.setItem('EventToken', res.enrollEvents.keyCourse)
        this._router.navigate(['/special'])
      } ,
      
      err => {this.errorServerMessageEvents = err.error;  }
    )

  }

}
