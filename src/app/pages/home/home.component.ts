import {Component, OnInit} from '@angular/core';
import {GitApiService} from '../../services/git-api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastCore} from '../../core/toast_core';
import {UserModel} from '../../models/user_model';
import {Router} from '@angular/router';
import {RoutesMap} from '../../core/routes_map';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  formulario: FormGroup;
  user: UserModel = new UserModel();
  progress: boolean;

  constructor(
    private gitService: GitApiService,
    private fb: FormBuilder,
    private toast: ToastCore,
    private router: Router,
  ) {
    const data = this.router.getCurrentNavigation();
    this.user = data.extras.state?.data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formulario = this.fb.group({
      name: [null, [Validators.required]],
    });
  }

  pesquisar() {
    if(this.formulario.valid) {
      this.progress = true;
      setTimeout(() => {
        this.gitService.get(this.formulario.value['name']).subscribe(result => {
          this.user = result;
        }, err => {
          if (err.status === 404) {
            this.toast.warning('Nenhum resultado encontrado.');
          } else {
            this.toast.error('Service Error');
          }
        });
        this.progress = false;
      }, 1000);
    } else {
      this.formulario.markAllAsTouched();
    }
  }

  reposButton() {
    this.router.navigateByUrl(RoutesMap.REPOS, {
      state: {data: this.user}
    });
  }

  starredButton() {
    this.router.navigateByUrl(RoutesMap.STARRED, {
      state: {data: this.user}
    });
  }

  limpar() {
    this.formulario.reset();
    this.user = null;
  }
}
