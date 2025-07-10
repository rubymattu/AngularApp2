import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

import { Reservation } from '../reservation';
import { ReservationService } from '../reservation.service';

@Component({
  standalone: true,
  selector: 'app-areas',
  imports: [HttpClientModule, CommonModule, FormsModule],
  providers: [ReservationService],
  templateUrl: './areas.html',
  styleUrls: ['./areas.css'],
})
export class AreasComponent implements OnInit {
  title = 'Reservation Manager';

  public reservations: Reservation[] = [];
  reservation: Reservation = {
    reservationID: 0,
    reservationImage: '',
    reservationName: '',
    reservationTime: '',
    isBooked: 0
  };

  timeSlots: string[] = [
    '9:00 am - 12:00 noon',
    '12:00 noon - 3:00 pm',
    '3:00 pm - 6:00 pm'
  ];

  error = '';
  success = '';
  selectedImage: File | null = null;

  constructor(
    private reservationService: ReservationService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getAll().subscribe(
      (reservations: Reservation[]) => {
        this.reservations = reservations;
        console.log('Reservations:', this.reservations);
        this.success = 'Successfully retrieved reservations';
        this.cdr.detectChanges();
      },
      (err) => {
        console.error('Error fetching reservations:', err);
        this.error = 'Error retrieving reservations';
      }
    );
  }

  editReservation(item: Reservation, index: number): void {
 
    console.log('Editing reservation:', item, 'at index:', index);
    this.resetAlerts();
    this.reservationService.edit(item).subscribe({
      next: () => {
        this.success = 'Reservation updated successfully';
      },
      error: (err) => {
        console.error('Error updating reservation:', err);
        this.error = 'Failed to update reservation';
      }
    });
  }

  addReservation(): void {
    this.resetAlerts();

    if (
      !this.reservation.reservationName ||
      !this.reservation.reservationTime
    ) {
      this.error = 'Please fill all fields.';
      return;
    }

    const formData = new FormData();
    formData.append('reservationName', this.reservation.reservationName);
    formData.append('reservationTime', this.reservation.reservationTime);
    formData.append('isBooked', String(this.reservation.isBooked));
    if (this.selectedImage) {
      formData.append('reservationImage', this.selectedImage);
    }

    this.reservationService.add(formData).subscribe({
      next: () => {
        this.success = 'Reservation added successfully';
        this.getReservations();

        this.reservation = {
          reservationID: 0,
          reservationName: '',
          reservationTime: '',
          isBooked: 0,
          reservationImage: ''
        };
        this.selectedImage = null;
      },
      error: (err) => {
        console.error('Error adding reservation:', err);
        this.error = 'Failed to add reservation';
      }
    });
  }

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedImage = input.files[0];
  }
}


  resetAlerts(): void {
    this.error = '';
    this.success = '';
  }
}
