interface EmailData {
  [key: string]: any;
}

export const sendEmail = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    const response = await fetch("/.netlify/functions/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType,
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    // Read the response body only once
    const responseText = await response.text();

    if (!response.ok) {
      console.error("Email API Error:", response.status, responseText);
      throw new Error(`Failed to send email: ${response.status} - ${responseText}`);
    }

    // Parse the successful response
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      console.warn("Could not parse response as JSON:", responseText);
      result = { message: responseText };
    }

    console.log("Email sent successfully:", result);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);

    // Provide more specific error information
    if (error instanceof Error) {
      if (error.message.includes("fetch")) {
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
