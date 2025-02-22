import dayjs from "dayjs";

export interface PropertyContactInfo {
  name: string;
  email: string;
  phone: string;
}

export interface IPropertyLocation {
  city: string;
  state: string;
  country: string;
  street: string;
  postal_code: string;
  latitude: number;
  longitude: number;
}

export interface IPropertyDetails {
  area_size: number;
  bedroom: number;
  bathroom: number;
  parking_spot: number;
  available_from: string;
  property_lot_size: string;
  build_year: string;
  structure_type: string;
  price_info: string;
  room: number;
}

export interface IPropertyFeatures {
  interior_details: string[];
  outdoor_details: string[];
  utilities: string[];
  other_features: string[];
}

export enum PropertyType {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  VILLA = 'VILLA',
  LAND = 'LAND',
}

export enum PropertyStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  RENTED = 'RENTED',
}

export interface IProperty {
  id: string;
  title: string;
  description: string;
  price: number;
  feature_image: string;
  images: string[];
  property_type: PropertyType;
  status: PropertyStatus;
  tags: string[];
  contact_info: PropertyContactInfo;
  location: IPropertyLocation;
  property_details: IPropertyDetails;
  features: string[];

  // read only
  created_at?: string;
  updated_at?: string;
  featured: boolean;
}

export const defaultProperty: IProperty = {
  id: '',
  title: '',
  description: '',
  price: 0,
  feature_image: '',
  images: [],
  property_type: PropertyType.APARTMENT,
  status: PropertyStatus.AVAILABLE,
  tags: [],
  contact_info: {
    name: '',
    email: '',
    phone: '',
  },
  location: {
    city: '',
    state: '',
    country: '',
    street: '',
    postal_code: '',
    latitude: 0,
    longitude: 0,
  },
  property_details: {
    area_size: 0,
    bedroom: 0,
    bathroom: 0,
    parking_spot: 0,
    available_from: dayjs().format('YYYY-MM-DD'),
    property_lot_size: '',
    build_year: '',
    structure_type: '',
    price_info: '',
    room: 0
  },
  features: [],
  featured: false
};
