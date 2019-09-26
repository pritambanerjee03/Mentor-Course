import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mentor-register',
  templateUrl: './mentor-register.component.html',
  styleUrls: ['./mentor-register.component.css']
})
export class MentorRegisterComponent implements OnInit {

  registerMentorData = {}

  constructor(private _auth: AuthService,
    public _router : Router) { }

  ngOnInit() {
  }

  registerMentor() {
    this._auth.registerMentor(this.registerMentorData)
    .subscribe(
      res => {
        localStorage.setItem('mentorToken', res.mentorsample.key)
        localStorage.setItem('mentorEmail',res.mentorsample.email)
        this._router.navigate(['/mentorBody'])
      },
      err => console.log(err)
    )      
  }

}
