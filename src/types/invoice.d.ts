export interface Invoice {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  ServiceName: string;
  InvoiceNumber: number;
  Date: string;
  Amount: number;
  Status: "Paid" | "Pending" | "Unpaid";
}