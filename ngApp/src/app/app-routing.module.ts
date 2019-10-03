import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { AuthGuard } from './auth.guard';
import { StudentBodyComponent } from './student-body/student-body.component';
import { MentorBodyComponent } from './mentor-body/mentor-body.component';
import { MentorLoginComponent } from './mentor-login/mentor-login.component';
import { MentorRegisterComponent } from './mentor-register/mentor-register.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfileComponent } from './profile/profile.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ViewCoursesComponent } from './view-courses/view-courses.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { AdminBodyComponent } from './admin-body/admin-body.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { OngoingCoursesComponent } from './ongoing-courses/ongoing-courses.component';
import { NotFound404Component } from './not-found404/not-found404.component';   
const routes: Routes = [
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'special',
    canActivate: [AuthGuard],
    component: SpecialEventsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'mentorBody',
    component: MentorBodyComponent
  },
  {
    path: 'mentor-login',
    component: MentorLoginComponent
  },
  {
    path: 'mentor-register',
    component: MentorRegisterComponent
  },
  {
    path: 'studentBody',
    component: StudentBodyComponent
  },
  {
    path: 'contactUs',
    component: ContactUsComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'mentorProfile',
    component: ProfileComponent
  },
  {
    path: 'addCourses',
    //canActivateAdmin: [AuthGuard],
    component: AddCourseComponent
  },
  {
    path: 'viewCourses',
    //canActivateAdmin: [AuthGuard],
    component: ViewCoursesComponent
  },
  {
    path: 'editCourses',
    //canActivateAdmin: [AuthGuard],
    component: EditCourseComponent
  },
  {
    path: 'adminBody',
    component: AdminBodyComponent
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  },
  {
    path: 'ongoingCourses',
    component: OngoingCoursesComponent
  },
  {
    path: '**',
    component: NotFound404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }