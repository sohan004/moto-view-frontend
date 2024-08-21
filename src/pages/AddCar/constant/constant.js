const engineFields = [
    { name: 'engine_type', type: 'text', placeholder: 'Engine Type' },
    { name: 'displacement', type: 'number', placeholder: 'Displacement (cc)' },
    { name: 'maximum_power', type: 'number', placeholder: 'Maximum Power (HP)' },
    { name: 'maximum_power_rpm', type: 'number', placeholder: 'Maximum Power RPM' },
    { name: 'maximum_torque', type: 'number', placeholder: 'Maximum Torque (Nm)' },
    { name: 'maximum_torque_rpm', type: 'number', placeholder: 'Maximum Torque RPM' },
    { name: 'fuel_system', type: 'text', placeholder: 'Fuel System' },
    { name: 'fuel_type', type: 'text', placeholder: 'Fuel Type' },
    { name: 'no_of_cylinders', type: 'number', placeholder: 'Number of Cylinders' },
    { name: 'valves_per_cylinder', type: 'number', placeholder: 'Valves Per Cylinder' },
    { name: 'ignition', type: 'text', placeholder: 'Ignition' },
    { name: 'gears', type: 'number', placeholder: 'Gears' },
];

const performanceFields = [
    { name: 'mileage', type: 'number', placeholder: 'Mileage (kmpl)' , holder: 'kmpl'},
    { name: 'top_speed', type: 'number', placeholder: 'Top Speed (kmph)' , holder: 'kmph'},
    { name: 'acceleration', type: 'number', placeholder: 'Acceleration (kmph in seconds)', holder: 'seconds (0 - 100 km/h)'},
];

const exteriorFields = [
    { name: 'overall_length', type: 'number', placeholder: 'Overall Length (mm)'  , holder: 'mm'},
    { name: 'overall_width', type: 'number', placeholder: 'Overall Width (mm)' , holder: 'mm'},
    { name: 'overall_height', type: 'number', placeholder: 'Overall Height (mm)' , holder: 'mm'},
    { name: 'turning_circle', type: 'number', placeholder: 'Turning Circle (mm)' , holder: 'mm'},
    { name: 'ground_clearance', type: 'number', placeholder: 'Ground Clearance (mm)' , holder: 'mm'},
    { name: 'doors', type: 'number', placeholder: 'Doors' },
    { name: 'kerb_weight', type: 'number', placeholder: 'Kerb Weight (kg)' , holder: 'kg'},
];

const interiorFields = [
    { name: 'seating_capacity', type: 'number', placeholder: 'Seating Capacity' },
    { name: 'fuel_tank_capacity', type: 'number', placeholder: 'Fuel Tank Capacity (litres)'  , holder: 'litres'},
    { name: 'cargo_capacity', type: 'number', placeholder: 'Cargo Capacity (litres)', holder: 'litres'},
    { name: 'no_of_airbags', type: 'number', placeholder: 'Number of Airbags' },
    { name: 'air_conditioner', type: 'text', placeholder: 'Air Conditioner' },
];

const suspensionAndBrakesFields = [
    { name: 'front_suspension', type: 'text', placeholder: 'Front Suspension' },
    { name: 'rear_suspension', type: 'text', placeholder: 'Rear Suspension' },
    { name: 'front_brake_type', type: 'text', placeholder: 'Front Brake Type' },
    { name: 'rear_brake_type', type: 'text', placeholder: 'Rear Brake Type' },
    { name: 'anti_lock_braking_system', type: 'text', placeholder: 'Anti-lock Braking System' },
];

const tyreAndWheelsFields = [
    { name: 'front_tyre', type: 'text', placeholder: 'Front Tyre' },
    { name: 'rear_tyre', type: 'text', placeholder: 'Rear Tyre' },
    { name: 'front_wheel', type: 'text', placeholder: 'Front Wheel' },
    { name: 'rear_wheel', type: 'text', placeholder: 'Rear Wheel' },
];

const otherFeaturesFields = [
    { name: 'head_lamp', type: 'text', placeholder: 'Head Lamp' },
    { name: 'back_camera', type: 'text', placeholder: 'Back Camera' },
    { name: 'screen_display', type: 'text', placeholder: 'Screen Display' },
];


export {
    engineFields,
    performanceFields,
    exteriorFields,
    interiorFields,
    suspensionAndBrakesFields,
    tyreAndWheelsFields,
    otherFeaturesFields
}