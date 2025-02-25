import { Typography } from '@mui/material';
import GooglePlacesAutocomplete, { geocodeByPlaceId } from 'react-google-places-autocomplete';

export interface ILocationResponsePayload {
  country: string;
  state: string;
  city: string;
  postalCode: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface ILocationAutoCompleteProps {
  onLocationChange: (data: ILocationResponsePayload) => void;
  id?: string | number;
  value: string | undefined;
  [key: string]: any;
  error?: boolean;
  helperText?: string;
}

export const LocationAutoComplete = (props: ILocationAutoCompleteProps) => (
  <>
    <GooglePlacesAutocomplete
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
      key={props.value}
      selectProps={{
        inputId: props.id?.toString(),
        placeholder: 'Choose Location',
        isClearable: true,
        defaultInputValue: props.value,
        onChange: async (place: any) => {
          const placeId = place?.value.place_id;

          console.log("place id: ", place, process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY);

          if (!placeId) return;

          try {
            // Get the detailed place information using the placeId
            const response = await geocodeByPlaceId(placeId);

            console.log("response inside location: ", response);
            const { address_components, geometry } = response[0];

            let city = '';
            let state = '';
            let country = '';
            let address = '';
            let zipCode = '';

            // Extract city, state, country, zip code, and address from the address_components
            for (const component of address_components) {
              const types = component.types;
              if (types.includes('locality')) {
                city = component.long_name;
              } else if (types.includes('administrative_area_level_1')) state = component.long_name;
              else if (types.includes('country')) country = component.long_name;
              else if (types.includes('postal_code')) zipCode = component.long_name;
              else if (
                types.includes('street_number') ||
                types.includes('route') ||
                types.includes('premise') ||
                types.includes('neighborhood') ||
                types.includes('sublocality')
              ) {
                // Concatenate street number and route (street name) to get the address
                address += component.long_name + ' ';
              }
            }

            props.onLocationChange({
              country: country,
              address: address || place.label,
              city: city,
              state: state,
              postalCode: zipCode,
              latitude: geometry.location.lat(),
              longitude: geometry.location.lng(),
            });
          } catch (error) {
            console.error('Error fetching geocode data:', error);
          }
        },
      }}
      autocompletionRequest={{
        componentRestrictions: {
          country: ['cr'],
        },
      }}
      {...props}
    />
    <Typography
      variant="body2"
      sx={{
        fontSize: '0.75rem',
        color: '#e46a76',
        marginLeft: 2,
        marginTop: 0.75,
      }}
    >
      {props.error && props.helperText}
    </Typography>
  </>
);

interface IAddressAutoCompleteProps {
  onLocationChange: (data: string) => void;
  id?: string | number;
  value: string | undefined;
  [key: string]: any;
}

export const AddressAutoComplete = (props: IAddressAutoCompleteProps) => (
  <GooglePlacesAutocomplete
    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
    key={props.value}
    selectProps={{
      inputId: props.id?.toString(),
      placeholder: 'Choose Location',
      isClearable: true,
      defaultInputValue: props.value,
      onChange: (value: any) => props.onLocationChange(value),
    }}
    autocompletionRequest={{
      componentRestrictions: {
        country: ['in'],
      },
    }}
    {...props}
  />
);
