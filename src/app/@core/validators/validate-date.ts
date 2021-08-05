import { FormGroup, ValidatorFn } from '@angular/forms';

export function toDateBeforeFromDate(to_date: string, from_date: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[to_date];
        const matchingControl = formGroup.controls[from_date];
        if (matchingControl.errors && !matchingControl.errors.dateNotValid) {
            return;
        }
        if (new Date(control.value) > new Date(matchingControl.value)) {
            matchingControl.markAsDirty();
            matchingControl.markAsTouched();
            matchingControl.setErrors({ dateNotValid: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
