import {Component, OnInit} from '@angular/core';
import {CustomerDTO} from "../../models/customer-dto";
import {CustomerService} from "../../services/customer/customer.service";
import {CustomerRegistrationRequest} from "../../models/customer-registration-request";
import {ConfirmationService, MessageService} from "primeng/api";
import {subscribeOn} from "rxjs";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})

//We need to initialize our customers array as soon as we load it so we implement OnInit
export class CustomerComponent implements OnInit{
  display = false;
  operation: 'create' | 'update' = 'create';

  customers: Array<CustomerDTO> = [];
  customer: CustomerRegistrationRequest = {}

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
  }

  ngOnInit(): void {
    //will automatically fetch all customers when we initialize the component
    this.findAllCustomers();
  }

  private findAllCustomers(){
    this.customerService.findAll()
      .subscribe({
        next: (data) => {
          this.customers = data;
        }
      })
  }

  save(customer: CustomerRegistrationRequest) {
    if (customer){
      if (this.operation === 'create'){
        this.customerService.registerCustomer(customer)
          .subscribe({
            next: () => {
              this.findAllCustomers();
              this.display = false;
              this.customer = {};
              this.messageService.add(
                {severity: 'success',
                  summary: 'Customer saved',
                  detail: `'Customer ${customer.name} was successfully saved`
                }
              );
            }
          });
      } else if (this.operation == 'update'){
        //since our customer is using the CustomerRegistrationRequest it does not contain the id so we have to figure our
        //another way to get the ID is to add the id field to customer registration request which will then be mapped to a
        //CustomerDTO object based our updateCustomer function on line 103
        this.customerService.updateCustomer(customer.id, customer)
        .subscribe({
          next: () => {
            this.findAllCustomers();
            this.display = false;
            this.customer = {};
            this.messageService.add(
              {severity: 'success',
                summary: 'Customer updated',
                detail: `'Customer ${customer.name} was successfully updated`
              }
            );
          }
        });
      }
    }
  }

  deleteCustomer(customer: CustomerDTO) {
    this.confirmationService.confirm({
      header: 'Delete Customer',
      message: `Are you sure you want to delete ${customer.name}? You can\'t undo this action afterwards`,
      accept: () => {
        this.customerService.deleteCustomer(customer.id)
          .subscribe({
            next: () =>{
              this.findAllCustomers()
              this.messageService.add(
                {severity: 'success',
                  summary: 'Customer deleted',
                  detail: `'Customer ${customer.name} was successfully deleted`
                }
              );
            }
          })
      }
    })
  }

  updateCustomer(customerDTO: CustomerDTO) {
    this.display = true;
    this.customer = customerDTO
    this.operation = 'update';
    console.log(customerDTO)
  }

  createCustomer() {
    this.display = true;
    //to get an empty form for customer
    this.customer = {};
    //so we get the correct form tab with fields that we want
    this.operation = 'create'
  }

  cancel() {
    this.display = false;
    this.customer = {};
    this.operation = 'create'
  }
}
