
# Setting Up EmailJS for Admin Notifications

The application is now configured with your EmailJS credentials:

- **Service ID**: service_c4j7pma
- **User ID**: WgE_CtN7sU876wEGJ

To complete the setup, you need to:

1. **Verify Your Email Template**:
   - Go to "Email Templates" in your EmailJS dashboard
   - If you haven't created a template yet, create a new one named "License Application Notification"
   - Ensure the template ID is "template_notification" (or update the TEMPLATE_ID in src/utils/emailService.ts)
   - Use variables like {{admin_email}}, {{form_data}}, {{subject}}, {{application_type}}, etc. in your template

2. **Test the Integration**:
   - Submit a test application using the form
   - Check your email at catosabastian@gmail.com
   - You should receive the notification with all application details

**Important**: With the provided credentials, real email notifications will be sent to catosabastian@gmail.com whenever a new license application is submitted.

**Note**: Check your EmailJS account's monthly email limit to ensure it meets your expected application volume.
