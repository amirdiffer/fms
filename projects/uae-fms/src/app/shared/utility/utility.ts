import { Injector } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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

  formArrayHasError(
    submited = false,
    formArray?: FormArray,
    index?: number,
    controlName?: string,
    errorType = 'required'
  ): boolean {
    const formControl: FormControl = formArray
      .at(index)
      .get(controlName) as FormControl;
    return (
      ((formControl.dirty && formControl.invalid) ||
        (formControl.invalid && submited)) &&
      formControl.hasError(errorType)
    );
  }
}
