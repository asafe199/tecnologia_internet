import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserModel} from '../../models/user_model';
import {GitApiService} from '../../services/git-api.service';
import {ToastCore} from '../../core/toast_core';
import {RoutesMap} from '../../core/routes_map';
import {ReposModel} from '../../models/repos_model';

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  user: UserModel = new UserModel();
  repo: ReposModel[] = [];
  progress: boolean;

  constructor(
    private router: Router,
    private gitService: GitApiService,
    private toast: ToastCore,
  ) {
    const data = this.router.getCurrentNavigation();
    this.user = data.extras.state?.data;
  }

  ngOnInit(): void {
    this.progress = true;
    setTimeout(() => {
      if (this.user?.login != null) {
        this.gitService.getRepo(this.user.login).subscribe(result => {
          if (result.length > 0) {
            this.repo = result;
          } else {
            this.toast.warning('Nenhum resultado encontrado');
          }
        }, error => {
          this.toast.error('Error Service');
          this.back();
        });
      }
      this.progress = false;
    }, 1000);
  }

  back() {
    this.router.navigateByUrl(RoutesMap.HOME, {state: {data: this.user}});
  }
}
