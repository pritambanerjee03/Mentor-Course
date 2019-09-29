import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-view-courses',
  templateUrl: './view-courses.component.html',
  styleUrls: ['./view-courses.component.css']
})
export class ViewCoursesComponent implements OnInit {

  viewCourses =[]
  errorServerMessageCourses: String = null;
  constructor(private _eventService: EventService,
    private _router: Router) { }

  ngOnInit() {
    this._eventService.getEvents()
      .subscribe(
        res => this.viewCourses = res,
        err => console.log(err),
      )
  }

  deleteCourse (course) {
    this._eventService.deleteCourse(course)
    .subscribe(
      res => {

        this._eventService.getEvents()
      .subscribe(
        res => this.viewCourses = res,
        err => console.log(err),
      )
        this.errorServerMessageCourses = res.error.text;
        
       // this._router.navigate(['/addCourses'])
      } ,
      
      err => {  this.errorServerMessageCourses = err.error.text;}
    )

  }

}
