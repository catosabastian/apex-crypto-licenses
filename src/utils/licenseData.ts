
/**
 * This file contains utility functions and data related to license management
 */

// Generate consistent license IDs in the format CL-YYYY-XXXX-TZ
// where YYYY is the year, XXXX is a unique number, and Z is the license tier (1-3)
export const generateLicenseId = (index: number, year: number, tier: number): string => {
  // Ensure the index is padded to 4 digits
  const paddedIndex = index.toString().padStart(4, '0');
  return `CL-${year}-${paddedIndex}-T${tier}`;
};

// Generate 100 license IDs
export const generateLicenseList = (): string[] => {
  const licenses: string[] = [];
  const currentYear = new Date().getFullYear();
  
  // Generate licenses across different tiers
  for (let i = 0; i < 100; i++) {
    // Distribute tiers - Tier 1: 40%, Tier 2: 35%, Tier 3: 25%
    let tier = 1;
    if (i >= 40) tier = 2;
    if (i >= 75) tier = 3;
    
    licenses.push(generateLicenseId(i + 1, currentYear, tier));
  }
  
  return licenses;
};

// List of valid license IDs
export const validLicenses = generateLicenseList();

// Function to check if a license ID is valid
export const isValidLicense = (licenseId: string): boolean => {
  return validLicenses.includes(licenseId);
};

// Sample license data for the example license card
export const sampleLicense = {
  id: "CL-2023-8294-T2",
  holder: "Thomas A. Anderson",
  type: "Category 2 - Advanced",
  issueDate: "01/15/2023",
  expiryDate: "01/15/2024",
  platforms: "Binance, Kraken, Coinbase"
};
