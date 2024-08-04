import { Routes } from '@angular/router';
import { LoginSignupComponent } from './pages/login-signup/login-signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {path:'',component:LoginSignupComponent},
    {path:'homePage',component:DashboardComponent}
];
