
import emailjs from 'emailjs-com';
import { supabase } from '@/integrations/supabase/client';

// Fallback configuration for when database is unavailable
const FALLBACK_CONFIG = {
  SERVICE_ID: "service_c4j7pma",
  TEMPLATE_ID: "template_notification", 
  USER_ID: "WgE_CtN7sU876wEGJ"
};

/**
 * Gets active EmailJS configuration from database or fallback
 */
const getEmailJSConfig = async () => {
  try {
    const { data, error } = await supabase
      .from('emailjs_settings')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.warn('No active EmailJS configuration found in database, using fallback');
      return FALLBACK_CONFIG;
    }

    return {
      SERVICE_ID: data.service_id,
      TEMPLATE_ID: data.template_id,
      USER_ID: data.user_id
    };
  } catch (error) {
    console.error('Error fetching EmailJS configuration:', error);
    return FALLBACK_CONFIG;
  }
};

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
    // Get EmailJS configuration from database
    const config = await getEmailJSConfig();
    
    if (!config.SERVICE_ID || !config.TEMPLATE_ID || !config.USER_ID) {
      console.error("Missing EmailJS configuration. Please check your settings in the admin panel.");
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
      to_name: "Admin",
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
        formData.companyName}. Please review the details.`,
    };

    console.log("Sending email notification with parameters:", templateParams);
    console.log("Using EmailJS configuration:", { 
      serviceId: config.SERVICE_ID, 
      templateId: config.TEMPLATE_ID,
      userId: config.USER_ID 
    });
    
    // Send the email with EmailJS
    const response = await emailjs.send(
      config.SERVICE_ID,
      config.TEMPLATE_ID,
      templateParams,
      config.USER_ID
    );

    console.log("Email notification sent successfully:", response);
    return response.status === 200;
  } catch (error) {
    console.error("Failed to send admin notification:", error);
    return false;
  }
};
