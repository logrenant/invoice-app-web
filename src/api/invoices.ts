import axios from 'axios';

import { InvoicesApiResponse } from '../types/apiResponse';

const API_BASE_URL = `http://localhost:8080`;

export const fetchInvoices = async (
    page: number,
    pageSize: number,
    search?: string
  ): Promise<InvoicesApiResponse> => { 
    try {
      const response = await axios.get<InvoicesApiResponse>(
        `${API_BASE_URL}/invoices`,
        {
          params: { 
            page: page - 1,
            limit: pageSize,
            search 
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error('Faturalar yüklenemedi');
    }
  };

export const getInvoice = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/invoices/${id}`);
    return response.data;
  };