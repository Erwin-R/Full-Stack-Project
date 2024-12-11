import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CustomerRegistrationRequest} from "../../models/customer-registration-request";

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent{

  @Input()
  customer: CustomerRegistrationRequest = {}

  @Input()
  operation: 'create' | 'update' = 'create';

  @Output()
  submit: EventEmitter<CustomerRegistrationRequest> = new EventEmitter<CustomerRegistrationRequest>();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();

  get isCustomerValid():boolean{
    return this.hasLength(this.customer.name) &&
      this.hasLength(this.customer.email) &&
      this.customer.age !== undefined && this.customer.age > 0 &&
      /**
       * so if we do not add this, our submit button on the update customer form will never be available since we are hiding
       * the password and gender fields from our update form. So our solution is to only require the password and gender if
       * our operation == 'create', otherwise we do not require those fields (line 37)
       */
      (
        this.operation == 'update' ||
        this.hasLength(this.customer.password) &&
        this.hasLength(this.customer.gender)
      )
  }

  private hasLength(input: string | undefined): boolean{
    return input !== null && input !== undefined && input.length > 0;

  }

  onSubmit() {
    //so once we submit our new customer it will emit the new customer object
    this.submit.emit(this.customer);
  }

  onCancel() {
    this.cancel.emit();
  }
}

