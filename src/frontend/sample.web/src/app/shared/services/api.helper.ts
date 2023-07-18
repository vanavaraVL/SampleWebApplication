import {Injectable} from '@angular/core';
import {Observable, throwError as observableThrowError} from 'rxjs';
import {RoutesEnums} from '../../types/enums/RoutesEnum';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ApiHelper {
  constructor(private router: Router) {}

  public handleError(result: Response | any): Observable<any> {
    let messageBody: string = '';
    switch (result.status) {
      case 0:
        messageBody = 'Connection timeout';
        break;
      case 404:
        this.router.navigate(['/', RoutesEnums.PAGES, RoutesEnums.NOTFOUND]);
        break;
      case 400:
        messageBody =
          result.error.message || 'One or more validation errors occurred.';
        break;
      default:
        messageBody = result.status.toString();
    }

    console.log(messageBody);

    return observableThrowError(`${result.status} ${messageBody}`);
  }
}
