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

    // Force development endpoint for debugging
    const isDevelopment =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.port === "8080";

    // Force local endpoint for now
    let endpoint = "/api/send-email";

    console.log("🌍 Environment detection:", {
      hostname: window.location.hostname,
      port: window.location.port,
      isDevelopment,
      endpoint,
      fullUrl: window.location.href,
    });

    let response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    });

    // If primary endpoint fails with 404, try fallback
    if (response.status === 404) {
      console.log("⚠️ Primary endpoint failed, trying fallback...");
      const fallbackEndpoint = isDevelopment
        ? "/.netlify/functions/send-email"
        : "/api/send-email";
      console.log("🔄 Trying fallback endpoint:", fallbackEndpoint);

      response = await fetch(fallbackEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
    }

    console.log("📧 Response status:", response.status);
    console.log("📧 Response ok:", response.ok);
    console.log("📧 Response URL:", response.url);
    console.log("📧 Response type:", response.type);

    // Read response body for better debugging
    let responseData;
    try {
      const responseText = await response.text();
      console.log("📧 Response text:", responseText);

      if (responseText) {
        try {
          responseData = JSON.parse(responseText);
          console.log("📧 Parsed response:", responseData);
        } catch (jsonError) {
          console.warn("Response is not JSON:", responseText);
          responseData = { message: responseText };
        }
      }
    } catch (parseError) {
      console.warn("Could not read response:", parseError);
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
