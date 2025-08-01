interface EmailData {
  [key: string]: any;
}

export const sendEmail = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("Sending email request to:", "/.netlify/functions/send-email");
    
    const requestBody = JSON.stringify({
      formType,
      data,
      timestamp: new Date().toISOString(),
    });

    const response = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    // Handle response with fallback for body stream issues
    let responseData;

    try {
      // Try to read as JSON first (most common case)
      responseData = await response.json();
    } catch (jsonError) {
      try {
        // If JSON fails, clone the response and try as text
        const responseClone = response.clone();
        const textResponse = await responseClone.text();
        responseData = { message: textResponse };
      } catch (textError) {
        // If both fail, create a generic response
        console.warn("Could not read response body:", jsonError, textError);
        responseData = {
          message: "Response received but could not be parsed",
          status: response.status
        };
      }
    }

    if (!response.ok) {
      console.error("Email API Error:", response.status, responseData);
      const errorMsg = responseData.message || responseData.error || `HTTP ${response.status}`;
      throw new Error(`Failed to send email: ${errorMsg}`);
    }

    console.log("Email sent successfully:", responseData);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);

    // Provide more specific error information
    if (error instanceof Error) {
      if (error.message.includes("NetworkError") || error.message.includes("Failed to fetch")) {
        console.error("Network error - check internet connection");
      } else if (error.message.includes("404")) {
        console.error("Email API endpoint not found");
      } else if (error.message.includes("500")) {
        console.error("Server error in email function");
      }
    }

    return false;
  }
};
