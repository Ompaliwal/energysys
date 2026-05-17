export interface Payment {
    _id?: string;
  
    consumerId: string;
  
    billId: string;
  
    amount: number;
  
    paymentMethod:
      | "Cash"
      | "UPI"
      | "Card"
      | "Bank Transfer";
  
    transactionId?: string;
  
    status:
      | "Success"
      | "Pending"
      | "Failed";
  }