import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ToastCore {
  constructor(private toastService: ToastrService) {

  }

  sucess(msg: string){
    this.toastService.success(msg);
  }

  error(msg: string){
    this.toastService.error(msg);
  }

  warning(msg: string){
    this.toastService.warning(msg);
  }
}
