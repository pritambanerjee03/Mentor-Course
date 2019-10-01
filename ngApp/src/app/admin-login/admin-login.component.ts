import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  errorServerMessage: String = null;
  loginMentorData = {}
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  loginAdmin () {
    this._auth.loginAdmin(this.loginMentorData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.sample.key)
        localStorage.setItem('adminEmail',res.sample.email)
        this._router.navigate(['/'])
      },
      err => {this.errorServerMessage = err.error;  }
    ) 
  }

}
