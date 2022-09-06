import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const WebAPI_ENDPOINT = 'api://<https://telecom-project-api.azurewebsites.net/api/Accounts>/access-as-user';

//need to check schema

type AccountType = {
  id?: '', 
  username?: '',
  password?: ''
};

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  account!: AccountType;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    this.http.get(WebAPI_ENDPOINT)
      .subscribe(account => {
        this.account = account;
      });
  }

  //update Account
}
