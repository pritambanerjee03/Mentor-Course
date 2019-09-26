import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register";
  private _loginUrl = "http://localhost:3000/api/login";
  private _registerMentorUrl = "http://localhost:3000/api/mentorRegister";
  private _loginMentorUrl = "http://localhost:3000/api/mentorLogin";
  public _user =""
  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    localStorage.removeItem('userEmail')
    this._router.navigate(['/events'])
  }

  registerMentor(user) {
    return this.http.post<any>(this._registerMentorUrl, user)
  }

  loginMentor(user) {
    return this.http.post<any>(this._loginMentorUrl, user)
  }

  logoutMentor() {
    localStorage.removeItem('mentorToken')
    localStorage.removeItem('mentorEmail')
    this._router.navigate(['/'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getMentorToken() {
    return localStorage.getItem('mentorToken')
  }

  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  loggedInUserName() {
    return localStorage.getItem('userEmail')   
  }

  loggedInMentor() {
    return !!localStorage.getItem('mentorToken')    
  }

  loggedInMentorName() {
    return localStorage.getItem('mentorEmail')   
  }
}
