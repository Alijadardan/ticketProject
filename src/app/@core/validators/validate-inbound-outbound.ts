import { FormGroup, ValidatorFn } from '@angular/forms';

export function SameInboundOutbound(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.sameValidator) {
            return;
        }
        if (control.value == matchingControl.value) {
            matchingControl.markAsDirty();
            matchingControl.markAsTouched();
            matchingControl.setErrors({ sameValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
