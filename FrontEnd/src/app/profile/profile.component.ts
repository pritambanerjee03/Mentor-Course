import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { EventService } from '../event.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mentorUpdateData = []
  constructor(private _auth: AuthService,private _eventService: EventService,
    private _router: Router) { }

  ngOnInit() {
    this._eventService.getMentorDetails()
      .subscribe(
        res => {
          this.mentorUpdateData = res;
          console.log(this.mentorUpdateData)
        },
        err => console.log(err)
      )
  }

 editMentorDetails(){
    this._eventService.editMentorDetails(this.mentorUpdateData)
    .subscribe(
      res => {
       this._router.navigate(['/courses'])
      },
      err => console.log(err)
    ) 
  }


}
