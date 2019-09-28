import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = "http://localhost:3000/api/special";
  private _coursesUrl = "http://localhost:3000/api/courses";
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
}
