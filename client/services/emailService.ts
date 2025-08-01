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

    // Clone response immediately to avoid body stream consumption issues
    const responseClone = response.clone();
    let responseData;

    try {
      // Always read as text first to avoid stream issues
      const textResponse = await response.text();

      // Try to parse as JSON
      try {
        responseData = JSON.parse(textResponse);
      } catch (parseError) {
        // If not valid JSON, wrap in message object
        responseData = { message: textResponse };
      }
    } catch (textError) {
      // Fallback to clone if original fails
      try {
        const fallbackText = await responseClone.text();
        responseData = { message: fallbackText };
      } catch (cloneError) {
        // Last resort - create generic response
        console.warn("All response reading methods failed:", textError, cloneError);
        responseData = {
          message: "Response received but could not be read",
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
