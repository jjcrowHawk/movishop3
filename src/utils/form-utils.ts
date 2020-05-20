import { FormBuilder, FormGroup, Validators, NgForm, FormControl, AbstractControl } from '@angular/forms'

export const isRequiredField = (abstractControl: AbstractControl): boolean => {
    if (abstractControl.validator) {
        const validator = abstractControl.validator({} as AbstractControl);
        if (validator && validator.required) {
            return true;
        }
    }
    if (abstractControl['controls']) {
        for (const controlName in abstractControl['controls']) {
            if (abstractControl['controls'][controlName]) {
                if (isRequiredField(abstractControl['controls'][controlName])) {
                    return true;
                }
            }
        }
    }
    return false;
};

export const isRequiredControl = (formGroup: NgForm, controlName: string): boolean => {
    const { controls } = formGroup
    const control = controls[controlName]
    const { validator } = control
    if (validator) {
        const validation = validator(new FormControl())
        return validation !== null && validation.required === true
    }
    return false
}