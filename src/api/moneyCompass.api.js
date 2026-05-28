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

/**
 * Fetches the coach welcome details from the backend.
 * @returns {Promise<Object>} The welcome data including name, avatar, role and text paragraphs
 */
export async function getCoachWelcome(name) {
  const response = await moneyCompassApi.get("/api/ai-coach/welcome", {
    params: name ? { name } : {}
  });
  return response.data;
}
