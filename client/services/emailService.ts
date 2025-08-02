interface EmailData {
  [key: string]: any;
}

export const sendEmail = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("Sending email request to:", "/api/send-email");

    const requestBody = JSON.stringify({
      formType,
      data,
      timestamp: new Date().toISOString(),
    });

    const endpoint = "/api/send-email";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    // Simple approach: just check status, don't read body unless absolutely necessary
    if (response.ok) {
      console.log("✅ Email sent successfully - status OK");
      return true;
    } else {
      console.error("❌ Email API Error - status:", response.status);
      console.error("Response details:", response.statusText);
      throw new Error(`Failed to send email: HTTP ${response.status} - ${response.statusText}`);
    }
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
