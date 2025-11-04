import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Vehicle, VehicleData } from '../models/vehicle.model';

// Interface para a resposta da API de veículos
interface VehiclesResponse {
  vehicles: Vehicle[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // A API (api.js) que você forneceu roda na porta 3001
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  /**
   * Ação 1: Autentica o usuário (POST /login)
   */
  login(credentials: { nome: string, senha: string }): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, credentials);
  }

  /**
   * Ação 3: Busca a lista de modelos de veículos (GET /vehicles)
   */
  getVehicles(): Observable<VehiclesResponse> {
    // O PDF cita /vehicle, mas o api.js usa /vehicles
    return this.http.get<VehiclesResponse>(`${this.baseUrl}/vehicles`);
  }

  /**
   * Ação 3: Busca dados de um veículo específico pelo VIN (POST /vehicleData)
   */
  getVehicleData(vin: string): Observable<VehicleData> {
    return this.http.post<VehicleData>(`${this.baseUrl}/vehicleData`, { vin });
  }
}