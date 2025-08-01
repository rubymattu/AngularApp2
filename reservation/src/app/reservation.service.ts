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
  edit(formData: FormData) {
  return this.http.post<any>('http://localhost/angularapp2/reservationapi/edit', formData);
}

  add(formData: FormData) {
  return this.http.post(`${this.baseUrl}/add.php`, formData);
}
}
