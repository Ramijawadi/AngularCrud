import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule , Validators} from '@angular/forms';
import { FilterPipe } from '../filter.pipe';
import { ReactiveFormsModule } from '@angular/forms';


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

  formValue!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.fetchEmployees();

    this.formValue = this.formBuilder.group({
      // id: ['', Validators.required],
      age: ['', Validators.required],
      email: ['', Validators.required],
      salary: ['', Validators.required],
      address: ['', Validators.required],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
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
