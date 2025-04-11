
import emailjs from 'emailjs-com';

// EmailJS configuration
const SERVICE_ID = "default_service"; // Your EmailJS service ID
const TEMPLATE_ID = "template_notification"; // Your EmailJS template ID
const USER_ID = "YOUR_USER_ID"; // Your EmailJS user ID

/**
 * Sends an email notification to the administrator when a new license application is submitted
 * @param formData - The application form data
 * @param adminEmail - The administrator's email address
 * @returns Promise<boolean> - Whether the email was sent successfully
 */
export const sendAdminNotification = async (
  formData: Record<string, any>,
  adminEmail: string
): Promise<boolean> => {
  try {
    const templateParams = {
      admin_email: adminEmail,
      form_data: JSON.stringify(formData, null, 2),
      subject: `New License Application - ${formData.applicantType === 'individual' ? 
        `${formData.firstName} ${formData.lastName}` : 
        formData.companyName}`,
      application_type: formData.applicantType === 'individual' ? 'Individual' : 'Corporate',
      license_category: `Category ${formData.licenseCategory}`,
      timestamp: new Date().toLocaleString(),
      payment_method: formData.paymentCrypto
    };

    console.log("Sending email notification with parameters:", templateParams);
    
    // In development or if EmailJS is not fully configured, log the data
    if (!USER_ID || USER_ID === "YOUR_USER_ID") {
      console.log("EmailJS not configured. Email would be sent to:", adminEmail);
      console.log("Email content:", templateParams);
      return true; // Mock success for development
    }

    // Send the actual email
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      USER_ID
    );

    console.log("Email notification sent successfully:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return false;
  }
};
