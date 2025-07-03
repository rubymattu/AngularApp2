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

  error = '';
  success = '';

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

  resetAlerts(): void {
    this.error = '';
    this.success = '';
  }
}
