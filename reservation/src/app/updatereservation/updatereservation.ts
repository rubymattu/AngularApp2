import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';

@Component({
  standalone: true,
  selector: 'app-updatereservation',
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  // providers: [ReservationService],
  templateUrl: './updatereservation.html',
  styleUrls: ['./updatereservation.css'],
})
export class Updatereservation {
reservation: any = {
    reservationName: '',
    reservationTime: '',
    isBooked: 0,
    reservationImage: ''
  };

  timeSlots = [
    '9:00 am - 12:00 noon',
    '12:00 noon - 3:00 pm',
    '3:00 pm - 6:00 pm'
  ];

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const data = navigation?.extras?.state?.['data'];

    if (data) {
      this.reservation = { ...data };
    }
  }
  success: string = '';
  error: string = '';
  editReservation() {
    // Implement update logic here
    console.log('Updating reservation:', this.reservation);
  }}
