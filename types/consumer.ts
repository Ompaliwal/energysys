export interface Consumer {
    _id?: string;
  
    consumerNumber: string;
  
    fullName: string;
  
    meterNumber: string;
  
    mobile?: string;
  
    email?: string;
  
    address?: string;
  
    tariffCategory?: string;
  
    sanctionedLoad?: number;
  
    status?: "Active" | "Inactive";
  }