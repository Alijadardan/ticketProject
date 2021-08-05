import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export default class Utils {

  static filterEmptyParameters(obj: any){
    return Object.entries(obj).reduce((a: any,[k,v]) => (v ? (a[k]=v, a) : a), {});
  }
}