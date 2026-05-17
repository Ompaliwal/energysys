export interface Meter {
    _id?: string;
  
    meterNumber: string;
  
    serialNumber: string;
  
    meterType:
      | "Electric"
      | "DG"
      | "Solar";
  
    phaseType:
      | "Single"
      | "Three";
  
    manufacturer?: string;
  
    installationDate?: string;
  
    initialReading?: number;
  
    currentReading?: number;
  
    location?: string;
  
    notes?: string;
  
    status:
      | "Active"
      | "Inactive"
      | "Faulty"
      | "Disconnected";
  }