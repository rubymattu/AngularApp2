import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

import { ReservationService } from '../reservation.service';

@Component({
  selector: 'app-viewreservation',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './viewreservation.html',
  styleUrls: ['./viewreservation.css'],
})
export class Viewreservation implements OnInit {
  reservations: any[] = [];
  error = '';
  success = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAll().subscribe({
      next: (data) => {
        console.log('API Data:', data);
        this.reservations = data;
        this.success = 'Reservations loaded successfully.';
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load reservations.';
      },
    });
  }

  editReservation(reservation: any): void {
    this.router.navigate(['/updatereservation'], { state: { data: reservation } });
  }
}
