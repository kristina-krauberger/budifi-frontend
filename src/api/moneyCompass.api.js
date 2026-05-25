import { moneyCompassApi } from "./axiosConfig";


/**
 * Sends user data to the Money Compass AI Coach endpoint.
 * @param {Object} formData - The user input data from MoneyCompassForm
 * @returns {Promise<string>} The response from the AI coach
 */
export async function generatePortfolioRecommendation(formData) {
  const response = await moneyCompassApi.post("/api/ai-coach", formData);
  return response.data;
}
