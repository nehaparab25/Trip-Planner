// src/app/login/login.component.ts

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <-- 1. ONE Router import

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// 2. ONE LoginComponent class definition
export class LoginComponent implements OnInit {

  // 3. Userdata object with all fields - pre-filled with default credentials
  userdata: any = {
    username: 'neha',
    password: '123456',
    email: '',
    contact: ''
  };

  // 4. Correct constructor with Router
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    // This is a good place to log, not for the login check
    console.log("Login component initialized with:", this.userdata);
  }

  // 5. The loginuser() method
  loginuser(): void {
    console.log("Login attempt with:", this.userdata);
    
    // Check only username and password
    if (this.userdata.username === "neha" &&
        this.userdata.password === "123456") {
      
      console.log("Login successful! Navigating to todo...");
      this.router.navigate(['home']).then(
        (success) => {
          console.log("Navigation successful:", success);
        },
        (error) => {
          console.error("Navigation failed:", error);
        }
      );

    } else {
      console.log("Login failed. Check credentials.");
      alert("Invalid username or password. Please try again.");
    }
  }
}