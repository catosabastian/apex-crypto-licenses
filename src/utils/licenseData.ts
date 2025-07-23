
/**
 * This file contains utility functions and data related to license management
 */

// Generate consistent license IDs in the format CL-YYYY-XXXX-TZ
// where YYYY is the year, XXXX is a unique number, and Z is the license tier (1-5)
export const generateLicenseId = (index: number, year: number, tier: number): string => {
  // Ensure the index is padded to 4 digits
  const paddedIndex = index.toString().padStart(4, '0');
  return `CL-${year}-${paddedIndex}-T${tier}`;
};

// Generate 150 license IDs across all tiers
export const generateLicenseList = (): string[] => {
  const licenses: string[] = [];
  const currentYear = new Date().getFullYear();
  
  // Generate licenses across different tiers with realistic distribution
  for (let i = 0; i < 150; i++) {
    // Distribute tiers - Tier 1: 20%, Tier 2: 25%, Tier 3: 30%, Tier 4: 15%, Tier 5: 10%
    let tier = 1;
    if (i >= 30) tier = 2; // 30-67 (25%)
    if (i >= 68) tier = 3; // 68-112 (30%)
    if (i >= 113) tier = 4; // 113-127 (15%)
    if (i >= 128) tier = 5; // 128-150 (10%)
    
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
  id: "CL-2024-8294-T3",
  holder: "Thomas A. Anderson",
  type: "Category 3 - Advanced",
  issueDate: "01/15/2024",
  expiryDate: "01/15/2025",
  platforms: "Binance, Kraken, Coinbase, KuCoin"
};

// License category information
export const licenseCategories = {
  1: { name: "Basic Trader", price: "25,000 USDT", minVolume: "$50,000", available: false, validity: "1 year" },
  2: { name: "Standard Trader", price: "50,000 USDT", minVolume: "$100,000", available: false, validity: "1 year" },
  3: { name: "Advanced Trader", price: "70,000 USDT", minVolume: "$250,000", available: true, validity: "Lifetime" },
  4: { name: "Professional Trader", price: "150,000 USDT", minVolume: "$500,000", available: true, validity: "Lifetime" },
  5: { name: "Institutional Trader", price: "250,000 USDT", minVolume: "$1,000,000+", available: true, validity: "Lifetime" },
};

// Get license category info by tier
export const getLicenseCategoryInfo = (tier: number) => {
  return licenseCategories[tier as keyof typeof licenseCategories] || null;
};
