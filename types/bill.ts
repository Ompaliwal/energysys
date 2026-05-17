export interface Bill {
    _id?: string;
  
    consumerId: string;
  
    meterId: string;
  
    readingId: string;
  
    month: string;
  
    oldReading: number;
  
    newReading: number;
  
    unitsConsumed: number;
  
    ratePerUnit: number;
  
    totalAmount: number;
  
    status: "Pending" | "Paid";
  }