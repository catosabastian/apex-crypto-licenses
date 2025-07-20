
# cPanel Deployment Guide for APEX Crypto Licensing Website

## Prerequisites
- cPanel hosting account with Node.js support (or static file hosting)
- Domain name configured in cPanel
- FTP/File Manager access

## Step 1: Build the Application

1. **Install Dependencies** (if not already done):
```bash
npm install
```

2. **Build for Production**:
```bash
npm run build
```

This creates a `dist` folder with all production files.

## Step 2: Upload Files to cPanel

### Method A: Using File Manager
1. Log into cPanel
2. Open **File Manager**
3. Navigate to `public_html` (or your domain's document root)
4. Upload the entire contents of the `dist` folder to this directory
5. Extract if uploaded as a zip file

### Method B: Using FTP
1. Connect to your hosting via FTP client
2. Navigate to `public_html` directory
3. Upload all files from the `dist` folder
4. Ensure file permissions are set correctly (644 for files, 755 for folders)

## Step 3: Configure URL Rewriting (Important for React Router)

Create a `.htaccess` file in your `public_html` directory with the following content:

```apache
RewriteEngine On
RewriteBase /

# Handle client-side routing
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Enable GZIP compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Set cache headers
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

## Step 4: Set Up Admin Access

### Default Admin Credentials
- **Username**: admin@apex.com
- **Password**: admin123

### To Access Admin Panel:
1. Navigate to `https://yourdomain.com/admin`
2. Use the credentials above to log in
3. **IMPORTANT**: Change the default password immediately after first login

### Admin Features Available:
- **License Management**: View and manage all issued licenses
- **Application Tracking**: Monitor license applications and their status
- **Contact Management**: Handle customer inquiries and support requests
- **Website Settings**: Update pricing, availability, and payment addresses
- **Analytics Dashboard**: Track performance metrics and revenue
- **Export Functions**: Download data as CSV for reporting

## Step 5: Configure Email Settings (Optional but Recommended)

To enable email notifications:

1. **Set up SMTP in cPanel**:
   - Go to **Email Accounts** in cPanel
   - Create a new email account (e.g., `admin@yourdomain.com`)
   - Note the SMTP settings provided

2. **Update Environment Variables**:
   Create a `.env` file in your root directory (if deploying with backend support):
   ```
   SMTP_HOST=mail.yourdomain.com
   SMTP_PORT=587
   SMTP_USER=admin@yourdomain.com
   SMTP_PASS=your_email_password
   ADMIN_EMAIL=your_admin_email@domain.com
   ```

## Step 6: SSL Certificate Setup

1. **Enable SSL in cPanel**:
   - Go to **SSL/TLS** section
   - Use **Let's Encrypt** for free SSL certificate
   - Force HTTPS redirects

2. **Update Links**:
   - Ensure all internal links use relative paths
   - Update any hardcoded URLs to use HTTPS

## Step 7: Testing the Deployment

### Test These Key Features:
1. **Homepage Loading**: Visit your domain
2. **Navigation**: Test all menu items and buttons
3. **License Application**: Try the application form
4. **License Verification**: Test the verification system
5. **Admin Access**: Log into `/admin` and test all features
6. **Contact Forms**: Submit a test contact form
7. **Mobile Responsiveness**: Test on mobile devices

### Common Issues and Solutions:

**Issue**: "Page Not Found" errors when navigating
**Solution**: Ensure `.htaccess` file is correctly configured

**Issue**: Assets not loading (CSS/JS files)
**Solution**: Check file permissions and paths

**Issue**: Admin panel not accessible
**Solution**: Verify routing is working and credentials are correct

**Issue**: Contact forms not sending emails
**Solution**: Configure SMTP settings and check hosting email policies

## Step 8: Maintenance and Updates

### Regular Tasks:
1. **Monitor Applications**: Check admin panel daily for new applications
2. **Backup Data**: Regular backups of any configuration files
3. **Update Content**: Keep pricing and information current
4. **Security**: Monitor for suspicious activity in admin logs

### Performance Optimization:
1. **Image Optimization**: Compress images before uploading
2. **Cache Settings**: Leverage browser caching via `.htaccess`
3. **CDN Setup**: Consider using a CDN for faster loading

## Support and Troubleshooting

If you encounter issues:
1. Check cPanel error logs
2. Verify file permissions (644 for files, 755 for directories)
3. Ensure `.htaccess` is properly configured
4. Test in different browsers and devices
5. Contact your hosting provider for server-specific issues

## Security Considerations

1. **Change Default Passwords**: Update admin credentials immediately
2. **Regular Updates**: Keep all systems updated
3. **Monitor Access**: Check admin access logs regularly
4. **Backup Strategy**: Implement regular backup procedures
5. **SSL Enforcement**: Ensure all traffic uses HTTPS

Your APEX Crypto Licensing website should now be fully operational on cPanel hosting!
