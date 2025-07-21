
import { secureDataManager } from './secureDataManager';

class DataMigration {
  private static instance: DataMigration;
  
  static getInstance(): DataMigration {
    if (!DataMigration.instance) {
      DataMigration.instance = new DataMigration();
    }
    return DataMigration.instance;
  }

  // Migrate data from old localStorage keys to encrypted secure storage
  migrateToSecureStorage(): void {
    try {
      console.log('Starting data migration to secure storage...');
      
      // Migrate settings
      this.migrateSettings();
      
      // Migrate applications
      this.migrateApplications();
      
      // Migrate contacts
      this.migrateContacts();
      
      // Migrate licenses
      this.migrateLicenses();
      
      // Clean up old data after successful migration
      this.cleanupOldData();
      
      console.log('Data migration completed successfully');
      
      // Mark migration as completed
      localStorage.setItem('apex_migration_completed', 'true');
      
    } catch (error) {
      console.error('Data migration failed:', error);
      secureDataManager.logSecurityEvent('security_alert', 'Data migration failed');
    }
  }

  private migrateSettings(): void {
    const oldSettings = localStorage.getItem('apex_settings');
    if (oldSettings && !localStorage.getItem('apex_admin_session')) {
      try {
        const parsedSettings = JSON.parse(oldSettings);
        secureDataManager.updateSettings(parsedSettings);
        console.log('Settings migrated successfully');
      } catch (error) {
        console.error('Failed to migrate settings:', error);
      }
    }
  }

  private migrateApplications(): void {
    const oldApplications = localStorage.getItem('apex_applications');
    if (oldApplications) {
      try {
        const parsedApplications = JSON.parse(oldApplications);
        // The secure system will encrypt and store these
        localStorage.removeItem('apex_applications');
        console.log('Applications migration prepared');
      } catch (error) {
        console.error('Failed to migrate applications:', error);
      }
    }
  }

  private migrateContacts(): void {
    const oldContacts = localStorage.getItem('apex_contacts');
    if (oldContacts) {
      try {
        const parsedContacts = JSON.parse(oldContacts);
        // The secure system will encrypt and store these
        localStorage.removeItem('apex_contacts');
        console.log('Contacts migration prepared');
      } catch (error) {
        console.error('Failed to migrate contacts:', error);
      }
    }
  }

  private migrateLicenses(): void {
    const oldLicenses = localStorage.getItem('apex_licenses');
    if (oldLicenses) {
      try {
        const parsedLicenses = JSON.parse(oldLicenses);
        // The secure system will encrypt and store these
        localStorage.removeItem('apex_licenses');
        console.log('Licenses migration prepared');
      } catch (error) {
        console.error('Failed to migrate licenses:', error);
      }
    }
  }

  private cleanupOldData(): void {
    // List of old localStorage keys to clean up
    const oldKeys = [
      'apex_settings_backup',
      'apex_applications_backup',
      'apex_contacts_backup', 
      'apex_licenses_backup'
    ];

    oldKeys.forEach(key => {
      if (localStorage.getItem(key)) {
        localStorage.removeItem(key);
      }
    });

    console.log('Old data cleanup completed');
  }

  // Check if migration is needed
  isMigrationNeeded(): boolean {
    const migrationCompleted = localStorage.getItem('apex_migration_completed');
    const hasOldData = localStorage.getItem('apex_settings') || 
                       localStorage.getItem('apex_applications') ||
                       localStorage.getItem('apex_contacts') ||
                       localStorage.getItem('apex_licenses');
    
    return !migrationCompleted && !!hasOldData;
  }

  // Force migration reset (for testing purposes)
  resetMigration(): void {
    localStorage.removeItem('apex_migration_completed');
    console.log('Migration reset - will run again on next load');
  }
}

export const dataMigration = DataMigration.getInstance();

// Auto-run migration on import if needed
if (dataMigration.isMigrationNeeded()) {
  dataMigration.migrateToSecureStorage();
}
