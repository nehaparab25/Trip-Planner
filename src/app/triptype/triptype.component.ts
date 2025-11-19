import { Component, OnInit } from '@angular/core';
import { ServicenameService } from '../service/servicename.service';
@Component({
  selector: 'app-triptype',
  templateUrl: './triptype.component.html',
  styleUrls: ['./triptype.component.css']
})
export class TriptypeComponent  {
  // model for form input values

  response:any= []
  loading: boolean = false;
  error: string | null = null;
  inputValues: any = {
    startDate: '',
    endDate: '',
    tripType: '',
    destination: '',
    budget: null
  };

  // trip type options
  triptype: string[] = [
    'Business Trip',
    'Relax',
    'Adventure',
    'Family',
    'eco-tourism'
  ];

  constructor(
    private genAi:ServicenameService
  ) { }

  ngOnInit(){ }

 
  submitTrip() {
    this.loading = true;
    this.error = null;
    this.response = null;
    this.genAi.datastore(this.inputValues).subscribe({
      next: (res) => {
        this.response = res;
      },
      error: (err) => {
        console.error('Error from datastore():', err);
        this.error = (err && err.message) ? err.message : 'Unknown error';
      },
      complete: () => {
        this.loading = false;
      }
    });
    
    
  }

}
