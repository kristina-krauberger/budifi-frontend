import api from "./axiosConfig";

export async function generateOpenAiResponse(userPrompt) {
  const response = await api.post(`/api/faq`, {
    user_prompt: userPrompt,
  });
  return response.data;
}
