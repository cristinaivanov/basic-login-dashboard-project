import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public email: string;
  public eventForm: FormGroup;
  public events: any;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('account')).email;

    this.initForm();
    this.setEvents();
  }

  public initForm(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      recurrence: [''],
      duration: ['']
    });
  }

  public setEvents(): void {
    this.events = [
      {
        name: 'Dentist appointment',
        startDate: '2021-04-26',
        endDate: '',
        recurrence: '',
        duration: '1h'
      },
      {
        name: 'Spanish class',
        startDate: '2021-04-23',
        endDate: '',
        recurrence: '',
        duration: '2h'
      },
      {
        name: "Angela's wedding",
        startDate: '2021-05-25',
        endDate: '2021-05-27',
        recurrence: '',
        duration: '2d'
      }
    ]
  }

  public addEvent(): void {
    this.events.push(this.eventForm.value);
    this.eventForm.reset();
  }

  public removeEvent(index): void {
    this.events.splice(index, 1);
  }

  public logout(): void {
    this.router.navigate(['']);
  }

}
