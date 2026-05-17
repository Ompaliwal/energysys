export interface MeterMapping {
    _id?: string;
  
    consumerId: string;
  
    meterId: string;
  
    startDate?: string;
  
    endDate?: string;
  
    isActive?: boolean;
  
    remarks?: string;
  }