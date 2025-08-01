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

    // Clone response to avoid body stream already read error
    const responseClone = response.clone();

    if (!response.ok) {
      const errorText = await responseClone.text();
      console.error("Email API Error:", response.status, errorText);
      throw new Error(`Failed to send email: ${response.status} - ${errorText}`);
    }

    // Parse the successful response from the original response
    let result;
    try {
      result = await response.json();
    } catch (parseError) {
      // If JSON parsing fails, try reading as text from the clone
      const textResult = await responseClone.text();
      console.warn("Could not parse response as JSON:", textResult);
      result = { message: textResult };
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
