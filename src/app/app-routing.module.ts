import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {RoutesMap} from './core/routes_map';
import {ReposComponent} from './pages/repos/repos.component';
import {StarredComponent} from './pages/starred/starred.component';

const routes: Routes = [
  {path: RoutesMap.DEFAULT, pathMatch: 'full', redirectTo: RoutesMap.HOME},
  {path: RoutesMap.HOME, component: HomeComponent},
  {path: RoutesMap.REPOS, component: ReposComponent},
  {path: RoutesMap.STARRED, component: StarredComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

