import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor-login',
  templateUrl: './mentor-login.component.html',
  styleUrls: ['./mentor-login.component.css']
})
export class MentorLoginComponent implements OnInit {

  errorServerMessage: String = null;
  loginMentorData = {}

  constructor(private _auth: AuthService,
    public _router : Router) { }

  ngOnInit() {
  }

  loginMentor () {
    this._auth.loginMentor(this.loginMentorData)
    .subscribe(
      res => {
        localStorage.setItem('mentorToken', res.mentorsample.key)
        localStorage.setItem('mentorEmail',res.mentorsample.email)
        this._router.navigate(['/mentorBody'])
      },
      err => {this.errorServerMessage = err.error;  }
    ) 
  }

}
