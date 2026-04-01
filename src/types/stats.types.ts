// types/dashboard.types.ts

export type Month = 
  | "Jan" | "Feb" | "Mar" | "Apr" | "May" | "Jun" 
  | "Jul" | "Aug" | "Sep" | "Oct" | "Nov" | "Dec";

export interface Counts {
  participatedEvents: number;
  invitations: number;
  payments: number;
}

export interface MonthlyRevenue {
  month: string;
  revenue: number;
}

export interface EventStatus {
  upcoming: number;
  completed: number;
  cancelled: number;
}

export interface ChartData {
  label?: string;    
  month?: Month;   
  value: number;
}

export interface DashboardData<T> {
  counts: Counts;
  totalRevenue: number;
  monthlyRevenue: T[]; // month + value
  eventStatus: EventStatus;
  pieChartData: T[];   // label + value
  barChartData: T[];   // month + value
}