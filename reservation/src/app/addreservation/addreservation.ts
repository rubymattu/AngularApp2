import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {  RouterModule } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-addreservation',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  // providers: [ReservationService],
  templateUrl: './addreservation.html',
  styleUrls: ['./addreservation.css']
})
export class Addreservation {
  reservation: Reservation = {
    reservationID: 0,
    reservationName: '',
    reservationTime: '',
    isBooked: 0,
    reservationImage: ''
  };

  selectedImage: File | null = null;
  success = '';
  error = '';

  timeSlots = [
    '9:00 am - 12:00 noon',
    '12:00 noon - 3:00 pm',
    '3:00 pm - 6:00 pm'
  ];

  constructor(private reservationService: ReservationService, private router: Router) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
    }
  }

  addReservation(): void {
    if (!this.reservation.reservationName || !this.reservation.reservationTime) {
      this.error = 'Please fill all fields.';
      return;
    }

    const formData = new FormData();
    formData.append('reservationName', this.reservation.reservationName);
    formData.append('reservationTime', this.reservation.reservationTime);
    formData.append('isBooked', this.reservation.isBooked.toString());
    if (this.selectedImage) {
      formData.append('reservationImage', this.selectedImage);
    }

    this.reservationService.add(formData).subscribe({
      next: () => {
        this.success = 'Reservation added successfully';
        this.router.navigate(['/']); // Navigate back to list
      },
      error: (err) => {
        console.error('Add failed:', err);
        this.error = 'Failed to add reservation';
      }
    });
  }
}
