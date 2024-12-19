"use server";

import axios from "axios";

interface LetterProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    address: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    businessName?: string;
  };
}

export const SendRequestAssistanceData = async (
  formData: LetterProps["formData"]
) => {
  console.log(formData);
  try {
    const response = await axios.post(
      `${process.env.URL}/api/request-assistance`,
      formData
    );

    if (response.status === 200) {
      return {
        success: true,
        data: response.data,
      };
    } else {
      return {
        success: false,
        error: "Error sending message",
      };
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      success: false,
      error: "Unexpected Error Occured",
    };
  }
};
