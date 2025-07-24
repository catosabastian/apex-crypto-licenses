
import emailjs from 'emailjs-com';

// EmailJS configuration
const SERVICE_ID = "service_c4j7pma"; // Your EmailJS service ID
const TEMPLATE_ID = "template_support"; // Your EmailJS template ID
const USER_ID = "WgE_CtN7sU876wEGJ"; // Your EmailJS user ID

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
    // Validate required EmailJS configuration
    if (!SERVICE_ID || !TEMPLATE_ID || !USER_ID) {
      console.error("Missing EmailJS configuration. Please check your credentials.");
      return false;
    }

    // Format the application data in a more readable way for the email
    const formattedData = {};
    
    // Format key details for better readability
    Object.keys(formData).forEach(key => {
      // Skip the large transaction ID to make the email cleaner
      if (key === 'transactionId') {
        formattedData[key] = formData[key];
        return;
      }
      
      // Format camelCase keys to readable text
      const formattedKey = key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
      
      formattedData[formattedKey] = formData[key];
    });

    // Prepare email parameters that match exactly what's expected in the template
    const templateParams = {
      to_name: "Admin", // Added for template compatibility
      to_email: adminEmail,
      admin_email: adminEmail,
      applicant_name: formData.applicantType === 'individual' ? 
        `${formData.firstName} ${formData.lastName}` : 
        formData.companyName,
      form_data: JSON.stringify(formattedData, null, 2),
      subject: `New License Application - ${formData.applicantType === 'individual' ? 
        `${formData.firstName} ${formData.lastName}` : 
        formData.companyName}`,
      application_type: formData.applicantType === 'individual' ? 'Individual' : 'Corporate',
      license_category: `Category ${formData.licenseCategory}`,
      timestamp: new Date().toLocaleString(),
      payment_method: formData.paymentCrypto,
      from_name: "Crypto License Portal",
      reply_to: formData.email || formData.businessEmail || adminEmail,
      message: `A new license application has been submitted by ${formData.applicantType === 'individual' ? 
        `${formData.firstName} ${formData.lastName}` : 
        formData.companyName}. Please review the details.`, // Added for template compatibility
    };

    console.log("Sending email notification with parameters:", templateParams);
    
    // Send the email with EmailJS
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
