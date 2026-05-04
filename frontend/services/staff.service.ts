// services/staff.service.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export const registerStaff = async (formData: FormData) => {

// export const registerStaff = async (formData: string) => {
  // console.log([...formData.entries()]);
  try {
    const response = await fetch(`${API_URL}/staff/register`, {
      method: "POST",
      // Note: Do NOT set Content-Type header manually when sending FormData.
      // The browser will automatically set it to multipart/form-data with the correct boundary.
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong during registration");
    }

    return result;
  } catch (error: any) {
    throw error;
  }
};