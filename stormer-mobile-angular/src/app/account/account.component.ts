import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import {NestedTreeControl} from '@angular/cdk/tree';
//import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Plan } from '../plan/plan';

const WebAPI_ENDPOINT = 'api://<https://telecom-project-api.azurewebsites.net/api/Accounts>/access-as-user';

//need to check schema

type AccountType = {
  id?: '', 
  username?: '',
  password?: ''
};

// interface BillingNode{
//   name: string;
//   children?: BillingNode[];
// }

// const BILLING_DATA: BillingNode[] = [
//   {
//     name:'Plans',
//     children:[Plan.name, ]
//   }, 
//   {
//     name:'Devices',
//     children:[]
//   },
// ]

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

 // treeControl = new NestedTreeControl<BillingNode>(node => node.children);
 // dataSource = new MatTreeNestedDataSource<BillingNode>();

  account!: AccountType;

  constructor(
    private http: HttpClient
   // this.dataSource.data = BILLING_DATA;
  ) { }

 // hasChild = (_: number, node: BillingNode) => !!node.children && node.children.length > 0;

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
