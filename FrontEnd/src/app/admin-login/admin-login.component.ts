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
  loginAdminData = {}
  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  loginAdmin () {
    this._auth.loginAdmin(this.loginAdminData)
    .subscribe(
      res => {
        localStorage.setItem('adminToken', res.adminsample.key)
        localStorage.setItem('adminEmail',res.adminsample.email)
        this._router.navigate(['/viewCourses'])
      },
      err => {this.errorServerMessage = err.error;  }
    ) 
  }

}
