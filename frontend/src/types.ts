export interface Order {
    id: string;
    productName: string;
    totalUnits: number;
    deliveredUnits: number;
    orderDate: string;
    status: 'pending' | 'partial' | 'completed';
  }
  
  export interface Invoice {
    id: string;
    orderId: string;
    amount: number;
    date: string;
    status: 'paid' | 'pending';
    units: number;
  }
  
  export interface User {
    id: string;
    name: string;
    company: string;
    email: string;
  }