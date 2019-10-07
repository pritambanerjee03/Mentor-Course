import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class EventService {

  public _setCourse:any;
  public _setCourseData:any;

  private _eventsUrl = "http://localhost:3000/api/events";
  private _specialEventsUrl = "http://localhost:3000/api/special";
  private _coursesUrl = "http://localhost:3000/api/courses";
  private _deleteCourseUrl = "http://localhost:3000/api/deleteCourse";
  private _addCourseUrl = "http://localhost:3000/api/addCourse";
  private _updateCourseUrl = "http://localhost:3000/api/editCourse";
  private _searchCourseUrl = "http://localhost:3000/api/searchCourse";
  private _getMentorUrl = "http://localhost:3000/api/getMentor";
  private _getMentorListUrl = "http://localhost:3000/api/listMentor";
  private _updateMentorUrl = "http://localhost:3000/api/editMentor";
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

  editCourses(course) {
    return this.http.put<any>(this._updateCourseUrl, course)
  }
  
  searchResult(searchField) {
    const search = {searchItem: searchField};
    console.log('eventService: ' + JSON.stringify(searchField))
    return this.http.post<any>(this._searchCourseUrl, search);
  }

  getMentorDetails() {
    return this.http.get<any>(this._getMentorUrl)
  }

  editMentorDetails(mentorData) {
    return this.http.put<any>(this._updateMentorUrl, mentorData)
  }

  getMentorListDetails() {
    return this.http.get<any>(this._getMentorListUrl)
  }
}
