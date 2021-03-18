import { Injector } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

export class Utility {
  protected router: Router;
  protected route: ActivatedRoute;
  constructor(injector: Injector) {
    this.router = injector.get(Router);
    this.route = injector.get(ActivatedRoute);
  }
  goToList() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  hasError(
    controlName: string,
    formGroup: any,
    submited = false,
    errorType = 'required'
  ): boolean {
    const control: FormControl = formGroup.get(controlName) as FormControl;
    if (
      ((control.dirty && control.invalid) || (control.invalid && submited)) &&
      control.hasError(errorType)
    ) {
      return true;
    }
    return false;
  }

  hasErrorFormArray(
    controlName: string,
    formArray: any,
    submited = false,
    errorType = 'required'
  ): boolean {
    const control: FormControl = formArray.get(controlName) as FormControl;
    if (
      ((control.dirty && control.invalid) || (control.invalid && submited)) &&
      control.hasError(errorType)
    ) {
      return true;
    }
    return false;
  }
}
