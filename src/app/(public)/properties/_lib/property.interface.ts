export interface IPropertyLocation {
  id: string;
  city: string;
  state: string;
  country: string;
  street?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
}

interface PropertyContactInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface IPropertyDetails {
  room: number;
  garage: number;
  bedroom: number;
  bathroom: number;
  area_size: number;
  price_info: string;
  build_year: string;
  garage_size: string;
  available_from: string;
  structure_type: string;
  property_lot_size: string;
}

export interface IUploader {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  profile_pic: string;
  role: 'USER' | 'ADMIN' | 'SUPER_ADMIN';
}

export interface IProperty {
  id: string;
  title: string;
  slug: string;
  description?: string;
  price: number;
  feature_image?: string;
  images?: string[];
  property_type: 'APARTMENT' | 'HOUSE' | 'VILLA' | 'LAND';
  status: 'AVAILABLE' | 'SOLD' | 'RENTED';
  tags?: string[];
  documents?: string[];
  property_details?: IPropertyDetails;
  features: {
    interior_details: string[];
    outdoor_details: string[];
    utilities: string[];
    other_features: string[];
  };
  contactInfo?: PropertyContactInfo;
  location: IPropertyLocation;
  created_at: string;
  updated_at: string;
  uploaded_by: IUploader;
}
