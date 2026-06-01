export interface ComputerSpecs {
  cpu: string;
  gpu: string;
  ram: string;
  storage: string;
  screen?: string;
  powerSupply?: string;
}

export type ComputerCategory = 'gaming' | 'pro' | 'office' | 'portable';

export interface Computer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: ComputerCategory;
  specs: ComputerSpecs;
  rating: number;
  reviewsCount: number;
  buyPrice: number;
  rentPrice: number; // Base monthly rent price for 12 months duration
  rentMinMonths: number;
  isFeatured: boolean;
  stock: number;
  isAvailableForRent: boolean;
  isAvailableForBuy: boolean;
  highlights: string[];
}

export interface RentalOption {
  durationMonths: number;
  priceFactor: number; // Multiplying factor (e.g. 1 month rental is 1.4x price, 24 months is 0.85x)
}

export interface ExtraAccessory {
  id: string;
  name: string;
  description: string;
  monthlyRentPrice: number;
  oneTimeBuyPrice: number;
  icon: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  isCompany: boolean;
  type: 'rental' | 'purchase' | 'custom';
  computerId?: string;
  durationMonths?: number;
  accessories: string[]; // List of extra accessories selected
  message?: string;
}
