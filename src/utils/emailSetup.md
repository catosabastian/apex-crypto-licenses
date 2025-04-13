
# Setting Up EmailJS for Admin Notifications

The application is now configured with your EmailJS credentials:

- **Service ID**: service_c4j7pma
- **User ID**: WgE_CtN7sU876wEGJ

To complete the setup, you need to:

1. **Create and Verify Your Email Template**:
   - Log into your EmailJS dashboard at https://dashboard.emailjs.com/admin/templates
   - Create a new template named "License Application Notification"
   - **Important**: Make sure the template ID is exactly "template_notification" (or update the TEMPLATE_ID in src/utils/emailService.ts)
   - In your template, include these variables (they must match exactly):
     ```
     {{to_name}} - The recipient's name ("Admin")
     {{admin_email}} - The admin email address
     {{applicant_name}} - Name of the applicant
     {{form_data}} - JSON representation of the form data
     {{subject}} - Email subject line
     {{application_type}} - Type of application (Individual/Corporate)
     {{license_category}} - License category applied for
     {{timestamp}} - Time of submission
     {{payment_method}} - Selected cryptocurrency payment method
     {{from_name}} - Sender name ("Crypto License Portal")
     {{reply_to}} - Reply-to email address
     {{message}} - Brief summary of the application submission
     ```

2. **Sample Template HTML**:
   ```html
   <h2>New License Application Submitted</h2>
   <p>Hello {{to_name}},</p>
   <p>{{message}}</p>
   
   <h3>Application Details:</h3>
   <p><strong>Applicant:</strong> {{applicant_name}}</p>
   <p><strong>Type:</strong> {{application_type}}</p>
   <p><strong>License:</strong> {{license_category}}</p>
   <p><strong>Payment Method:</strong> {{payment_method}}</p>
   <p><strong>Submitted:</strong> {{timestamp}}</p>
   
   <h3>Full Application Data:</h3>
   <pre>{{form_data}}</pre>
   
   <p>---</p>
   <p>Crypto License Portal</p>
   ```

3. **Test the Integration**:
   - Submit a test application using the form
   - Check your email at catosabastian@gmail.com
   - You should receive the notification with all application details
   - If no email is received, check the browser console for error messages

**Important**: With the provided credentials, real email notifications will be sent to catosabastian@gmail.com whenever a new license application is submitted.

**Troubleshooting**: If emails are not being received, please verify:
1. The template ID matches exactly what's in the code (template_notification)
2. All template variables are spelled correctly
3. Your EmailJS account is active and within the free tier limits
4. The email isn't being filtered to spam/junk folders

