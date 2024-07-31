import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule , Validators} from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { Employee } from './employee.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, FilterPipe,ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  http = inject(HttpClient);
  employees: any = [];
  firstName: any;
  searchText: any;
  employeeObj:Employee = new Employee()
  formValue!: FormGroup;
  allEmployees : any;

  constructor(private formBuilder: FormBuilder , private api:ApiService) {}

  ngOnInit(): void {
    this.fetchEmployees();

    this.formValue = this.formBuilder.group({
      id: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      adress: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      contactNumber: ['', Validators.required],
    });
  }

  fetchEmployees() {
    this.http
      .get('https://retoolapi.dev/HYd96h/data')
      .subscribe((employees: any) => {
        console.log(employees);
        this.employees = employees;
      });
  }

add(){


}

addEmployee(){

  this.employeeObj.id = this.formValue.value.id;
  this.employeeObj.age = this.formValue.value.age;
  this.employeeObj.dob = this.formValue.value.dob;

  this.employeeObj.email = this.formValue.value.email;
  this.employeeObj.salary = this.formValue.value.salary;
  this.employeeObj.adress = this.formValue.value.adress;
  this.employeeObj.imageUrl = this.formValue.value.imageUrl;

  this.employeeObj.firstName = this.formValue.value.firstName;
  this.employeeObj.lastName = this.formValue.value.lastName;
  this.employeeObj.contactNumber = this.formValue.value.contactNumber;


  this.api.postEmployee(this.employeeObj).subscribe(res=>{
console.log(res);
this.formValue.reset();
this.fetchEmployees()
    alert('record added successfully !')
  },

error => {

  alert('something went Wrong !')
} )
}


//get

// getEmployee(){

//   this.api.getEmployee().subscribe(res=> {
//  this.allEmployees = res ;

//   })
// }

//delete

deleteEmployee(data:any) {
if(confirm('are you sure to delete !'))
  this.api.deleteEmployee(data.id)
  .subscribe(res=> {
    alert('record deleted successfully !');
    this.fetchEmployees()
  })

}

  Search() {
    if (this.firstName == '') {
      this.ngOnInit();
    } else {
      this.employees = this.employees.filter((res: { firstName: string }) => {
        return res.firstName
          .toLocaleLowerCase()
          .match(this.firstName.toLocaleLowerCase());
      });
    }
  }

  key: string = 'id';
  reverse: boolean = false;
  sort(key: string) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
