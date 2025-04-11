
# Setting Up EmailJS for Admin Notifications

To fully enable the email notification system, you need to create an account on EmailJS and configure it with your information. Follow these steps:

1. **Create an EmailJS Account**: Visit [EmailJS website](https://www.emailjs.com/) and sign up for a free account.

2. **Create an Email Service**: 
   - In your EmailJS dashboard, go to "Email Services" 
   - Add a new service (Gmail, Outlook, or other)
   - Complete the authentication process

3. **Create an Email Template**:
   - Go to "Email Templates" in your dashboard
   - Create a new template named "License Application Notification"
   - Use variables like {{admin_email}}, {{form_data}}, {{subject}}, {{application_type}}, etc. in your template
   - Design the email as needed

4. **Get Your EmailJS User ID**: 
   - Go to "Integration" in your dashboard
   - Copy your "User ID"

5. **Update the Configuration in the Application**:
   - Open `src/utils/emailService.ts`
   - Replace the placeholders with your actual EmailJS configuration:
     ```
     const SERVICE_ID = "your_service_id"; // From the Email Services section
     const TEMPLATE_ID = "your_template_id"; // From the Email Templates section
     const USER_ID = "your_user_id"; // From the Integration section
     ```

Once configured, the application will send real email notifications to catosabastian@gmail.com whenever a new license application is submitted.

**Note**: The free tier of EmailJS allows 200 emails per month, which should be sufficient for testing and initial production use.
