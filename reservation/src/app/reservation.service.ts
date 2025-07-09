import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from './reservation';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  baseUrl = 'http://localhost/angularapp2/reservationapi';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Reservation[]>(`${this.baseUrl}/list`);
  }
  edit(reservation: Reservation) {
    return this.http.put<Reservation>(`${this.baseUrl}/edit`, reservation);
  }
}
