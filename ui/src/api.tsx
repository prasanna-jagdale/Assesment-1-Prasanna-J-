import axios from 'axios';

const API_URL = 'http://localhost:5000/api/CalculateCommission';

export const calculateCommission = async (localSalesCount, foreignSalesCount, averageSaleAmount) => {
    try {
        const response = await axios.post(API_URL, {
            localSalesCount,
            foreignSalesCount,
            averageSaleAmount
        });
        return response.data;
    } catch (error) {
        throw new Error('Error calculating commission: ' + error.message);
    }
};