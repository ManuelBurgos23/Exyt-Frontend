import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function espaciosEnBlanco(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim();
    return value && value.length > 0 ? null : { 'soloEspacios': true };
  };
}
