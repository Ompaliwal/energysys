export interface MeterReading {
    _id?: string;
  
    meterId: string;
  
    consumerId: string;
  
    oldReading: number;
  
    newReading: number;
  
    unitsConsumed: number;
  
    month: string;
  
    remarks?: string;
  
    status?: "Pending" | "Verified";
  }