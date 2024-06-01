import { FormControl } from "@angular/forms";

export interface FeedbackForm {
  name: FormControl;
  email: FormControl;
  comment: FormControl;
  star: FormControl;
}