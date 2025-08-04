interface EmailData {
  [key: string]: any;
}

export const sendEmail = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Sending email request to:", "/api/send-email");
    console.log("📧 Form type:", formType);
    console.log("📧 Data keys:", Object.keys(data));

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

    console.log("📧 Response status:", response.status);
    console.log("📧 Response ok:", response.ok);

    // Read response body for better debugging
    let responseData;
    try {
      const responseText = await response.text();
      console.log("📧 Response text:", responseText);

      if (responseText) {
        responseData = JSON.parse(responseText);
        console.log("📧 Parsed response:", responseData);
      }
    } catch (parseError) {
      console.warn("Could not parse response:", parseError);
    }

    if (response.ok) {
      console.log("✅ Email sent successfully!");
      return true;
    } else {
      console.error("❌ Email API Error - status:", response.status);
      console.error("❌ Response data:", responseData);
      return false; // Return false instead of throwing to allow popup to show
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return false; // Return false instead of throwing to allow popup to show
  }
};
