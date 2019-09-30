import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  public _setCourse:any;

  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = "http://localhost:3000/api/special";
  private _coursesUrl = "http://localhost:3000/api/courses";
  private _deleteCourseUrl = "http://localhost:3000/api/deleteCourse";
  private _addCourseUrl = "http://localhost:3000/api/addCourse";
  private _updateCourseUrl = "http://localhost:3000/api/editCourse";
  constructor(private http: HttpClient) { }

  getEvents() {
    return this.http.get<any>(this._eventsUrl)
  }

  getSpecialEvents() {
    return this.http.get<any>(this._specialEventsUrl)
  }

  enrollCourse(user) {
    return this.http.post<any>(this._specialEventsUrl, user)
  }
  enrolledEvents() {
    return !!localStorage.getItem('EventToken')    
  }
  getCourses() {
    return this.http.get<any>(this._coursesUrl)
  }
  deleteCourse(course){
    return this.http.post<any>(this._deleteCourseUrl, course)
  }

  setCourse(course){
    this._setCourse = course;
    
  }
  getCourse(){
    return this._setCourse;
  }
  
  registerCourses(course) {
    return this.http.post<any>(this._addCourseUrl, course)
  }

  updateCourses(course) {
    return this.http.post<any>(this._updateCourseUrl, course)
  }
}
