import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Reservation } from '../reservation';
import { Auth } from '../services/auth';
import { ReservationService } from '../reservation.service';

@Component({
  standalone: true,
  selector: 'app-updatereservation',
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './updatereservation.html',
  styleUrls: ['./updatereservation.css'],
  providers: [ReservationService, Auth]
})
export class Updatereservation {
  reservation: any = {
    reservationID: 0,
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
  reservationName = ['Rattlesnake Conservation Area',
                     'Glen Haffy Conservation Area',
                     'Heart Lake Conservation Area',
                     'Mountsberg Conservation Area'
  ];

  success: string = '';
  error: string = '';
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  userName: string = '';

  constructor(
    private router: Router, 
    private http: HttpClient, 
    public authService: Auth,
    private cdr: ChangeDetectorRef,
    private reservationService: ReservationService) {
    const navigation = this.router.getCurrentNavigation();
    const data = navigation?.extras?.state?.['data'];

    if (data) {
      this.reservation = { ...data };
    }
  }
  ngOnInit() {
    this.userName = localStorage.getItem('username') || 'Guest';
    this.cdr.detectChanges();
  }

  editReservation() {
    console.log('Updating reservation:', this.reservation);

    const formData = new FormData();
    formData.append('reservationID', this.reservation.reservationID.toString());
    formData.append('reservationName', this.reservation.reservationName);
    formData.append('reservationTime', this.reservation.reservationTime);
    formData.append('isBooked', this.reservation.isBooked.toString());

    // Pass existing image name to server
    formData.append('existingImage', this.reservation.reservationImage || '');

    // Append new image if selected
    if (this.selectedFile) {
      formData.append('reservationImage', this.selectedFile);
    }

    this.http.post('http://localhost/angularapp2/reservationapi/edit.php', formData).subscribe({
      next: (res: any) => {
        this.success = 'Reservation updated successfully!';
        this.error = '';
        // Redirect to reservation list after successful update
        setTimeout(() => {
          this.router.navigate(['/viewreservation']);
        }, 1000);
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.error = err.error?.message || 'Failed to update reservation.';
        this.success = '';
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Preview selected image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  cancelUpdate() {
    this.router.navigate(['/reservations']);
  }
}
