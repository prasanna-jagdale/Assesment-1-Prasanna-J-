import axios from 'axios';

const API_URL = 'http://localhost:5111/api/commission/calculate';

interface CommissionRequest {
    localSalesCount: number;
    foreignSalesCount: number;
    averageSaleAmount: number;
}

interface CommissionResponse {
    commission: number;
}

export const calculateCommission = async (
    localSalesCount: number,
    foreignSalesCount: number,
    averageSaleAmount: number
): Promise<CommissionResponse> => {
    try {
        const response = await axios.post<CommissionResponse>(API_URL, {
            localSalesCount,
            foreignSalesCount,
            averageSaleAmount
        } as CommissionRequest);
        return response.data;
    } catch (error: any) {
        throw new Error('Error calculating commission: ' + error.message);
    }
};