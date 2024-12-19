"use server";

import axios from "axios";

interface LetterProps {
  formData: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

export const SendMessageAction = async (formData: LetterProps["formData"]) => {
  console.log(formData);
  try {
    const response = await axios.post(
      `${process.env.URL}/api/write-letter`,
      formData // Send `formData` directly
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
