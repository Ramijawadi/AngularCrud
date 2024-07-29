import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  http = inject(HttpClient) ;
  employees : any = []

  ngOnInit(): void {
    this.fetchEmployees();
     
  }

  fetchEmployees() {
    this.http.get('https://retoolapi.dev/HYd96h/data')
    .subscribe((employees : any) => {

      console.log(employees);
      this.employees = employees ;
    })
  }

}
