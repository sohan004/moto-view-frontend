import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";
import Loader from '../../components/Loader/Loader';
import getMediaFile from '../../utilities/getMediaFile';
import PriceFormet from "../../components/PriceFormet/PriceFormet";
import { brakeFields, chassisAndSuspensionFields, dimensionsFields, electricalsFields, featuresFields, mileageAndTopSpeedFields, transmissionFields, wheelAndTyreFields } from "../AddBike/constant/constant";
import CompareSkleton from "../../components/CompareSkleton/CompareSkleton";
import BikeOverviewSklaton from "../../components/BikeOverviewSklaton/BikeOverviewSklaton";

const ComparePage = () => {
    const { bike1, bike2 } = useParams();
    const [bike1Data, setBike1Data] = useState({});
    const [bike2Data, setBike2Data] = useState({});
    const [loading, setLoading] = useState(true);
    const axios = useAxios();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: data1 } = await axios.get(`/bike/${bike1}`);
                const { data: data2 } = await axios.get(`/bike/${bike2}`);
                setBike1Data(data1);
                setBike2Data(data2);
                setLoading(false);
            } catch (error) {
                console.error(error);
                navigate('/');
            }
        };
        fetchData();
    }, [bike1, bike2]);

    const getValue = (data, key) => {
        return key.split('.').reduce((acc, cur) => acc && acc[cur], data) || 'N/A';
    };

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
        },
        {
            name: 'maximum_torque',
            type: 'number',
            placeholder: 'Maximum Torque (Nm)',
            required: true,
        },
        {
            name: 'bore',
            type: 'number',
            placeholder: 'Bore (mm)',
            holder: 'mm',
        },
        {
            name: 'stroke',
            type: 'number',
            placeholder: 'Stroke (mm)',
            holder: 'mm',
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

    const specification = [
        {
            name: 'Engine',
            field: engineFelids
        },
        {
            name: 'Transmission',
            field: transmissionFields
        },
        {
            name: 'Mileage And Top Speed',
            field: mileageAndTopSpeedFields
        },
        {
            name: 'Chassis And Suspension',
            field: chassisAndSuspensionFields
        },
        {
            name: 'Break',
            field: brakeFields
        },
        {
            name: 'Wheel And Tyre',
            field: wheelAndTyreFields
        },
        {
            name: 'Dimensions',
            field: dimensionsFields
        },
        {
            name: 'Electricals',
            field: electricalsFields
        },
        {
            name: 'Features',
            field: featuresFields
        },
    ]

    if (loading) return <BikeOverviewSklaton />

    return (
        <div className="max-w-[1280px] mx-auto p-3 md:p-4">
            <div className="flex flex-col md:flex-row gap-5 md:gap-10">
                <div className="md:w-1/2 w-full">
                    <h2 className="text-xl font-semibold">{bike1Data.name}</h2>
                    <img className="w-full" src={getMediaFile(bike1Data.img)} alt={bike1Data.name} />
                    <h3 className="text-lg font-bold text-red-600 mt-2">
                        Price: <PriceFormet>{bike1Data.price}</PriceFormet> BDT
                    </h3>
                    <p className=" font-medium text-gray-500">Brand: <span className="text-black capitalize">
                    {bike1Data?.brand}
                    </span></p>
                </div>
                <div className="md:w-1/2 w-full">
                    <h2 className="text-xl font-semibold">{bike2Data.name}</h2>
                    <img className="w-full" src={getMediaFile(bike2Data.img)} alt={bike2Data.name} />
                    <h3 className="text-lg font-bold text-red-600 mt-2">
                        Price: <PriceFormet>{bike2Data.price}</PriceFormet> BDT
                    </h3>
                    <p className=" font-medium text-gray-500">Brand: <span className="text-black capitalize">
                    {bike2Data?.brand}
                    </span></p>
                </div>
            </div>

            <div className="overflow-x-auto mt-5">
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b"></th>
                            <th className="py-2 px-4 border-b">{bike1Data.name}</th>
                            <th className="py-2 px-4 border-b">{bike2Data.name}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {specification.map((spec, specIndex) => (
                            <React.Fragment key={specIndex}>
                                <tr>
                                    <td colSpan="3" className="bg-gray-200 font-semibold py-2 px-4">{spec.name}</td>
                                </tr>
                                {spec.field.map((field, fieldIndex) => (
                                    <tr className="text-xs md:text-sm" key={fieldIndex}>
                                        <td className="py-2 px-4 border-b font-semibold">
                                            {field.name.split('_').join(' ')}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {`${getValue(bike1Data, `specification.${spec.name.split(' ').join('_').toLowerCase()}.${field.name}`)} ${field?.holder || ''}`}
                                        </td>
                                        <td className="py-2 px-4 border-b">
                                            {`${getValue(bike2Data, `specification.${spec.name.split(' ').join('_').toLowerCase()}.${field.name}`)} ${field?.holder || ''}`}
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparePage;
