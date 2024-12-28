export interface PropertyContactInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface IPropertyLocation {
  city: string;
  state: string;
  country: string;
  street: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface IPropertyDetails {
  area_size: number;
  bedroom?: number;
  bathroom?: string;
  garage?: number;
  available_from?: string;
  property_lot_size?: string;
  year_build?: string;
  structure_type?: string;
  price_info?: string;
  room?: number;
  garage_size?: string;
}

export interface IPropertyFeatures {
  interior_details?: string[];
  outdoor_details?: string[];
  utilities?: string[];
  other_features?: string[];
}

interface IPropertyType {
  APARTMENT: 'APARTMENT';
  HOUSE: 'HOUSE';
  VILLA: 'VILLA';
  LAND: 'LAND';
}

export interface IPropertyStatus {
  AVAILABLE: 'AVAILABLE';
  SOLD: 'SOLD';
  RENTED: 'RENTED';
}

export interface IProperty {
  id: string;
  title: string;
  description?: string;
  price: number;
  property_type?: IPropertyType;
  status?: "AVAILABLE" | "SOLD" | "RENTED";
  tags?: string[];
  contact_info?: PropertyContactInfo;
  location?: IPropertyLocation;
  property_details?: IPropertyDetails;
  features?: IPropertyFeatures;

  // read only 
  created_at?: string;
  updated_at?: string;
}
