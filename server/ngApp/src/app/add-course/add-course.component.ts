import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseAddData = {}

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }
  registerCourses() {
    this._auth.registerCourses(this.courseAddData)
    .subscribe(
      res => {
       
        this._router.navigate(['/'])
      },
      err => console.log(err)
    )      
  }

}
