// src/app/core/models/vehicle.model.ts

// Interface para a lista de veículos (GET /vehicles)
// Esta interface bate com o api.js
export interface Vehicle {
  id: number;
  vehicle: string;
  volumetotal: number;
  connected: number;
  softwareUpdates: number;
  img: string; // A API envia este campo
}

// Interface para os dados da tabela (POST /vehicleData)
// Esta estava faltando no seu arquivo veiculo.model.ts
export interface VehicleData {
  id: number;
  odometro: number;
  nivelCombustivel: number;
  status: string;
  lat: number;
  long: number;
}