import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ReservationService } from '../reservation.service';
import { Auth } from '../services/auth';

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
  userName: string = '';

  constructor(
    private reservationService: ReservationService,
    private router: Router,
    public authService: Auth,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.loadReservations();
    this.cdr.detectChanges(); // Ensure UI is updated after data fetch
    this.userName = localStorage.getItem('username') || 'Guest';
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
