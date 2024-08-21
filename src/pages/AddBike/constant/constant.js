const engineFelids = [
    {
        name: 'engine_type',
        type: 'text',
        placeholder: 'Engine Type'
    },
    {
        name: 'displacement',
        type: 'number',
        placeholder: 'Displacement (cc)',
        holder: 'CC'
    },
    {
        name: 'maximum_power',
        type: 'number',
        placeholder: 'Maximum Power (BHP)',
        required: true,
        holder: 'BHP'
    },
    {
        name: 'maximum_power_rpm',
        type: 'number',
        placeholder: 'Maximum Power RPM',
        required: true,
    },
    {
        name: 'maximum_torque',
        type: 'number',
        placeholder: 'Maximum Torque (Nm)',
        required: true
    },
    {
        name: 'maximum_torque_rpm',
        type: 'number',
        placeholder: 'Maximum Torque RPM',
        required: true
    },
    {
        name: 'bore',
        type: 'number',
        placeholder: 'Bore (mm)'
    },
    {
        name: 'stroke',
        type: 'number',
        placeholder: 'Stroke (mm)'
    },
    {
        name: 'compression_ratio',
        type: 'number',
        placeholder: 'Compression Ratio'
    },
    {
        name: 'valves',
        type: 'number',
        placeholder: 'Number of Valves'
    },
    {
        name: 'fuel_supply',
        type: 'text',
        placeholder: 'Fuel Supply'
    },
    {
        name: 'no_of_cylinders',
        type: 'number',
        placeholder: 'Number of Cylinders'
    },
    {
        name: 'engine_cooling',
        type: 'text',
        placeholder: 'Engine Cooling'
    },
    {
        name: 'starting_method',
        type: 'text',
        placeholder: 'Starting Method'
    }
];

const transmissionFields = [
    {
        name: 'transmission_type',
        type: 'text',
        placeholder: 'Transmission Type'
    },
    {
        name: 'no_of_gears',
        type: 'number',
        placeholder: 'Number of Gears'
    },
    {
        name: 'clutch_type',
        type: 'text',
        placeholder: 'Clutch Type'
    },
    {
        name: 'drive_type',
        type: 'text',
        placeholder: 'Drive Type'
    }
];

const mileageAndTopSpeedFields = [
    {
        name: 'mileage',
        type: 'number',
        placeholder: 'Mileage (kmpl approx)',
        holder: 'Kmpl (approx)'
    },
    {
        name: 'top_speed',
        type: 'number',
        placeholder: 'Top Speed (kmph approx)',
        holder: 'Kmph (approx)'
    }
];

const chassisAndSuspensionFields = [
    {
        name: 'chassis_type',
        type: 'text',
        placeholder: 'Chassis Type'
    },
    {
        name: 'front_suspension',
        type: 'text',
        placeholder: 'Front Suspension'
    },
    {
        name: 'rear_suspension',
        type: 'text',
        placeholder: 'Rear Suspension'
    }
];

const brakeFields = [
    {
        name: 'front_break_type',
        type: 'text',
        placeholder: 'Front Brake Type'
    },
    {
        name: 'rear_break_type',
        type: 'text',
        placeholder: 'Rear Brake Type'
    },
    {
        name: 'front_break_diameter',
        type: 'number',
        placeholder: 'Front Brake Diameter (mm)',
        holder: 'mm'
    },
    {
        name: 'rear_break_diameter',
        type: 'number',
        placeholder: 'Rear Brake Diameter (mm)',
        holder: 'mm'
    },
    {
        name: 'abs',
        type: 'text',
        placeholder: 'ABS'
    },
    {
        name: 'braking_system',
        type: 'text',
        placeholder: 'Braking System'
    }
];

const wheelAndTyreFields = [
    {
        name: 'front_tyre_size',
        type: 'text',
        placeholder: 'Front Tyre Size'
    },
    {
        name: 'rear_tyre_size',
        type: 'text',
        placeholder: 'Rear Tyre Size'
    },
    {
        name: 'tyre_type',
        type: 'text',
        placeholder: 'Tyre Type'
    },
    {
        name: 'wheel_type',
        type: 'text',
        placeholder: 'Wheel Type'
    }
];

const electricalsFields = [
    {
        name: 'battery_type',
        type: 'text',
        placeholder: 'Battery Type'
    },
    {
        name: 'battery_voltage',
        type: 'number',
        placeholder: 'Battery Voltage (V)',
        holder: 'V'
    },
    {
        name: 'head_light',
        type: 'text',
        placeholder: 'Head Light'
    },
    {
        name: 'tail_light',
        type: 'text',
        placeholder: 'Tail Light'
    },
    {
        name: 'indicator',
        type: 'text',
        placeholder: 'Indicator'
    }
];

const featuresFields = [
    {
        name: 'speedometer',
        type: 'text',
        placeholder: 'Speedometer'
    },
    {
        name: 'odometer',
        type: 'text',
        placeholder: 'Odometer'
    },
    {
        name: 'rpm_meter',
        type: 'text',
        placeholder: 'RPM Meter'
    },
    {
        name: 'handle_type',
        type: 'text',
        placeholder: 'Handle Type'
    },
    {
        name: 'seat_type',
        type: 'text',
        placeholder: 'Seat Type'
    },
    {
        name: 'passenger_grab_rail',
        type: 'text',
        placeholder: 'Passenger Grab Rail'
    },
    {
        name: 'engine_kill_switch',
        type: 'text',
        placeholder: 'Engine Kill Switch'
    },
    {
        name: 'additional_features',
        type: 'text',
        placeholder: 'Additional Features'
    }
];

const dimensionsFields = [
    {
        name: 'overall_length',
        type: 'number',
        placeholder: 'Overall Length (mm)',
        holder: 'mm',
    },
    {
        name: 'overall_width',
        type: 'number',
        placeholder: 'Overall Width (mm)',
        holder: 'mm',
    },
    {
        name: 'height',
        type: 'number',
        placeholder: 'Height (mm)',
        holder: 'mm',
    },
    {
        name: 'ground_clearance',
        type: 'number',
        placeholder: 'Ground Clearance (mm)',
        holder: 'mm',
    },
    {
        name: 'weight',
        type: 'number',
        placeholder: 'Weight (kg)',
        holder: 'kg',
    },
    {
        name: 'fuel_capacity',
        type: 'number',
        placeholder: 'Fuel Capacity (Liter)',
        holder: 'Liter',
    },
    {
        name: 'wheelbase',
        type: 'number',
        placeholder: 'Wheelbase (mm)',
        holder: 'mm',
    },
    {
        name: 'seat_height',
        type: 'number',
        placeholder: 'Seat Height (mm)',
        holder: 'mm',
    }
];



const countries = [
    { label: 'Afghanistan', value: 'AF' },
    { label: 'Albania', value: 'AL' },
    { label: 'Algeria', value: 'DZ' },
    { label: 'Andorra', value: 'AD' },
    { label: 'Angola', value: 'AO' },
    { label: 'Antigua and Barbuda', value: 'AG' },
    { label: 'Argentina', value: 'AR' },
    { label: 'Armenia', value: 'AM' },
    { label: 'Australia', value: 'AU' },
    { label: 'Austria', value: 'AT' },
    { label: 'Azerbaijan', value: 'AZ' },
    { label: 'Bahamas', value: 'BS' },
    { label: 'Bahrain', value: 'BH' },
    { label: 'Bangladesh', value: 'BD' },
    { label: 'Barbados', value: 'BB' },
    { label: 'Belarus', value: 'BY' },
    { label: 'Belgium', value: 'BE' },
    { label: 'Belize', value: 'BZ' },
    { label: 'Benin', value: 'BJ' },
    { label: 'Bhutan', value: 'BT' },
    { label: 'Bolivia', value: 'BO' },
    { label: 'Bosnia and Herzegovina', value: 'BA' },
    { label: 'Botswana', value: 'BW' },
    { label: 'Brazil', value: 'BR' },
    { label: 'Brunei', value: 'BN' },
    { label: 'Bulgaria', value: 'BG' },
    { label: 'Burkina Faso', value: 'BF' },
    { label: 'Burundi', value: 'BI' },
    { label: 'Cabo Verde', value: 'CV' },
    { label: 'Cambodia', value: 'KH' },
    { label: 'Cameroon', value: 'CM' },
    { label: 'Canada', value: 'CA' },
    { label: 'Central African Republic', value: 'CF' },
    { label: 'Chad', value: 'TD' },
    { label: 'Chile', value: 'CL' },
    { label: 'China', value: 'CN' },
    { label: 'Colombia', value: 'CO' },
    { label: 'Comoros', value: 'KM' },
    { label: 'Congo, Democratic Republic of the', value: 'CD' },
    { label: 'Congo, Republic of the', value: 'CG' },
    { label: 'Costa Rica', value: 'CR' },
    { label: 'Croatia', value: 'HR' },
    { label: 'Cuba', value: 'CU' },
    { label: 'Cyprus', value: 'CY' },
    { label: 'Czech Republic', value: 'CZ' },
    { label: 'Denmark', value: 'DK' },
    { label: 'Djibouti', value: 'DJ' },
    { label: 'Dominica', value: 'DM' },
    { label: 'Dominican Republic', value: 'DO' },
    { label: 'Ecuador', value: 'EC' },
    { label: 'Egypt', value: 'EG' },
    { label: 'El Salvador', value: 'SV' },
    { label: 'Equatorial Guinea', value: 'GQ' },
    { label: 'Eritrea', value: 'ER' },
    { label: 'Estonia', value: 'EE' },
    { label: 'Eswatini', value: 'SZ' },
    { label: 'Ethiopia', value: 'ET' },
    { label: 'Fiji', value: 'FJ' },
    { label: 'Finland', value: 'FI' },
    { label: 'France', value: 'FR' },
    { label: 'Gabon', value: 'GA' },
    { label: 'Gambia', value: 'GM' },
    { label: 'Georgia', value: 'GE' },
    { label: 'Germany', value: 'DE' },
    { label: 'Ghana', value: 'GH' },
    { label: 'Greece', value: 'GR' },
    { label: 'Grenada', value: 'GD' },
    { label: 'Guatemala', value: 'GT' },
    { label: 'Guinea', value: 'GN' },
    { label: 'Guinea-Bissau', value: 'GW' },
    { label: 'Guyana', value: 'GY' },
    { label: 'Haiti', value: 'HT' },
    { label: 'Honduras', value: 'HN' },
    { label: 'Hungary', value: 'HU' },
    { label: 'Iceland', value: 'IS' },
    { label: 'India', value: 'IN' },
    { label: 'Indonesia', value: 'ID' },
    { label: 'Iran', value: 'IR' },
    { label: 'Iraq', value: 'IQ' },
    { label: 'Ireland', value: 'IE' },
    { label: 'Israel', value: 'IL' },
    { label: 'Italy', value: 'IT' },
    { label: 'Jamaica', value: 'JM' },
    { label: 'Japan', value: 'JP' },
    { label: 'Jordan', value: 'JO' },
    { label: 'Kazakhstan', value: 'KZ' },
    { label: 'Kenya', value: 'KE' },
    { label: 'Kiribati', value: 'KI' },
    { label: 'Kuwait', value: 'KW' },
    { label: 'Kyrgyzstan', value: 'KG' },
    { label: 'Laos', value: 'LA' },
    { label: 'Latvia', value: 'LV' },
    { label: 'Lebanon', value: 'LB' },
    { label: 'Lesotho', value: 'LS' },
    { label: 'Liberia', value: 'LR' },
    { label: 'Libya', value: 'LY' },
    { label: 'Liechtenstein', value: 'LI' },
    { label: 'Lithuania', value: 'LT' },
    { label: 'Luxembourg', value: 'LU' },
    { label: 'Madagascar', value: 'MG' },
    { label: 'Malawi', value: 'MW' },
    { label: 'Malaysia', value: 'MY' },
    { label: 'Maldives', value: 'MV' },
    { label: 'Mali', value: 'ML' },
    { label: 'Malta', value: 'MT' },
    { label: 'Marshall Islands', value: 'MH' },
    { label: 'Mauritania', value: 'MR' },
    { label: 'Mauritius', value: 'MU' },
    { label: 'Mexico', value: 'MX' },
    { label: 'Micronesia', value: 'FM' },
    { label: 'Moldova', value: 'MD' },
    { label: 'Monaco', value: 'MC' },
    { label: 'Mongolia', value: 'MN' },
    { label: 'Montenegro', value: 'ME' },
    { label: 'Morocco', value: 'MA' },
    { label: 'Mozambique', value: 'MZ' },
    { label: 'Myanmar', value: 'MM' },
    { label: 'Namibia', value: 'NA' },
    { label: 'Nauru', value: 'NR' },
    { label: 'Nepal', value: 'NP' },
    { label: 'Netherlands', value: 'NL' },
    { label: 'New Zealand', value: 'NZ' },
    { label: 'Nicaragua', value: 'NI' },
    { label: 'Niger', value: 'NE' },
    { label: 'Nigeria', value: 'NG' },
    { label: 'North Korea', value: 'KP' },
    { label: 'North Macedonia', value: 'MK' },
    { label: 'Norway', value: 'NO' },
    { label: 'Oman', value: 'OM' },
    { label: 'Pakistan', value: 'PK' },
    { label: 'Palau', value: 'PW' },
    { label: 'Palestine', value: 'PS' },
    { label: 'Panama', value: 'PA' },
    { label: 'Papua New Guinea', value: 'PG' },
    { label: 'Paraguay', value: 'PY' },
    { label: 'Peru', value: 'PE' },
    { label: 'Philippines', value: 'PH' },
    { label: 'Poland', value: 'PL' },
    { label: 'Portugal', value: 'PT' },
    { label: 'Qatar', value: 'QA' },
    { label: 'Romania', value: 'RO' },
    { label: 'Russia', value: 'RU' },
    { label: 'Rwanda', value: 'RW' },
    { label: 'Saint Kitts and Nevis', value: 'KN' },
    { label: 'Saint Lucia', value: 'LC' },
    { label: 'Saint Vincent and the Grenadines', value: 'VC' },
    { label: 'Samoa', value: 'WS' },
    { label: 'San Marino', value: 'SM' },
    { label: 'Sao Tome and Principe', value: 'ST' },
    { label: 'Saudi Arabia', value: 'SA' },
    { label: 'Senegal', value: 'SN' },
    { label: 'Serbia', value: 'RS' },
    { label: 'Seychelles', value: 'SC' },
    { label: 'Sierra Leone', value: 'SL' },
    { label: 'Singapore', value: 'SG' },
    { label: 'Slovakia', value: 'SK' },
    { label: 'Slovenia', value: 'SI' },
    { label: 'Solomon Islands', value: 'SB' },
    { label: 'Somalia', value: 'SO' },
    { label: 'South Africa', value: 'ZA' },
    { label: 'South Korea', value: 'KR' },
    { label: 'South Sudan', value: 'SS' },
    { label: 'Spain', value: 'ES' },
    { label: 'Sri Lanka', value: 'LK' },
    { label: 'Sudan', value: 'SD' },
    { label: 'Suriname', value: 'SR' },
    { label: 'Sweden', value: 'SE' },
    { label: 'Switzerland', value: 'CH' },
    { label: 'Syria', value: 'SY' },
    { label: 'Taiwan', value: 'TW' },
    { label: 'Tajikistan', value: 'TJ' },
    { label: 'Tanzania', value: 'TZ' },
    { label: 'Thailand', value: 'TH' },
    { label: 'Timor-Leste', value: 'TL' },
    { label: 'Togo', value: 'TG' },
    { label: 'Tonga', value: 'TO' },
    { label: 'Trinidad and Tobago', value: 'TT' },
    { label: 'Tunisia', value: 'TN' },
    { label: 'Turkey', value: 'TR' },
    { label: 'Turkmenistan', value: 'TM' },
    { label: 'Tuvalu', value: 'TV' },
    { label: 'Uganda', value: 'UG' },
    { label: 'Ukraine', value: 'UA' },
    { label: 'United Arab Emirates', value: 'AE' },
    { label: 'United Kingdom', value: 'GB' },
    { label: 'United States', value: 'US' },
    { label: 'Uruguay', value: 'UY' },
    { label: 'Uzbekistan', value: 'UZ' },
    { label: 'Vanuatu', value: 'VU' },
    { label: 'Vatican City', value: 'VA' },
    { label: 'Venezuela', value: 'VE' },
    { label: 'Vietnam', value: 'VN' },
    { label: 'Yemen', value: 'YE' },
    { label: 'Zambia', value: 'ZM' },
    { label: 'Zimbabwe', value: 'ZW' }
];



export {
    countries,
    engineFelids,
    transmissionFields,
    mileageAndTopSpeedFields,
    chassisAndSuspensionFields,
    brakeFields,
    wheelAndTyreFields,
    dimensionsFields,
    electricalsFields,
    featuresFields
}
