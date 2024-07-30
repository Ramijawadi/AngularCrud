import { NgIf ,NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe'; // <-- Add this
import {Ng2OrderModule} from 'ng2-order-pipe'
import {Ng2SearchPipeModule} from 'ng2-search-filter'
import { FilterPipe } from "../filter.pipe";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, FilterPipe],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit{

  http = inject(HttpClient) ;
  employees : any = []
  firstName : any ;
  searchText : any ;

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

  Search() {

    if(this.firstName== ""){
      this.ngOnInit()
    }
    else {

      this.employees = this.employees.filter((res: { firstName: string; })=> {

        return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      })

    }
  }

key : string = 'id';
reverse : boolean = false ;
  sort(key: string){

    this.key = key ;
    this.reverse = !this.reverse ;
  }

}
