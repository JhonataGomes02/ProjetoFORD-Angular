import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms'; 
import { Observable, Subject, combineLatest, of } from 'rxjs';
import { map, startWith, switchMap, debounceTime, distinctUntilChanged, filter, catchError, shareReplay } from 'rxjs/operators';
import { ApiService } from '../../core/api/api.service';
// Importa os modelos corretos que acabamos de corrigir
import { Vehicle, VehicleData } from '../../core/models/vehicle.model';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RouterLink 
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allVehicles$!: Observable<Vehicle[]>;
  selectedVehicle$!: Observable<Vehicle | undefined>;
  vehicleData$!: Observable<VehicleData | null>;

  modelSearchControl = new FormControl('');
  vinSearchControl = new FormControl('');
  vinError$ = new Subject<string | null>();

  constructor(
    private apiService: ApiService,
    private router: Router // Injetar o Router para o logout
  ) { }

  ngOnInit(): void {
    // Busca os veículos (com tratamento de erro)
    this.allVehicles$ = this.apiService.getVehicles().pipe(
      map(response => response.vehicles),
      catchError(err => {
        console.error('Falha ao buscar veículos:', err);
        return of([]); 
      }),
      shareReplay(1) 
    );

    // Observável para o veículo selecionado
    this.selectedVehicle$ = combineLatest([
      this.allVehicles$,
      this.modelSearchControl.valueChanges.pipe(startWith('')) 
    ]).pipe(
      map(([vehicles, selectedName]) => { 
        return vehicles.find(v => v.vehicle === selectedName);
      })
    );
    
    // Observável para a busca da tabela (VIN)
    this.vehicleData$ = this.vinSearchControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      filter(vin => !!vin && vin.length > 10), 
      switchMap(vin => {
        this.vinError$.next(null); 
        return this.apiService.getVehicleData(vin!).pipe(
          catchError(err => { 
            // Usa a mensagem de erro da API
            this.vinError$.next(err.error?.message || 'Código VIN utilizado não foi encontrado!');
            return of(null); 
          })
        );
      }),
    );
  }

  // Função para o botão de logout
  logout(event: Event): void {
    event.preventDefault(); // Impede o link de navegar
    this.router.navigate(['/login']);
  }
}