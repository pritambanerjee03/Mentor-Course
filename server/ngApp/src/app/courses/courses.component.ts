import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses = []
  constructor(private _eventService: EventService, private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
    this._eventService.getCourses()
    .subscribe(
      res => this.courses = res,
      err => console.log(err),
    )
  }

}
