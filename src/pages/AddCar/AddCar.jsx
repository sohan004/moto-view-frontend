import { useState } from "react";
import { FaRegImage } from "react-icons/fa";
import Select from "react-select";
import useGetBrand from "../../Hooks/useGetBrand";
import useGetCategory from "../../Hooks/useGetCategory";
import toast from "react-hot-toast";
import useAxios from "../../Hooks/useAxios";
import { useNavigate } from "react-router-dom";
import ButtonLoader from "../../components/ButtonLoader/ButtonLoader";
import { countries } from "../AddBike/constant/constant";
import { engineFields, exteriorFields, interiorFields, otherFeaturesFields, performanceFields, suspensionAndBrakesFields, tyreAndWheelsFields } from "./constant/constant";

const AddCar = () => {
    const axios = useAxios()
    const navigate = useNavigate()
    const allBrands = useGetBrand()
    const allCategories = useGetCategory('car')
    const [colorImage, setColorImage] = useState(null)
    const [colorName, setColorName] = useState('')
    const [showAddColor, setShowAddColor] = useState(false)

    const [img, setImg] = useState(null)
    const [name, setName] = useState('')
    const [country, setCountry] = useState([{
        value: 'BD',
        label: 'Bangladesh'
    }])
    const [brand, setBrand] = useState('')
    const [modelYear, setModelYear] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(null)
    const [assembleIn, setAssembleIn] = useState('')
    const [description, setDescription] = useState('')
    const [color, setColor] = useState([])
    const [engine, setEngine] = useState({})
    const [performance, setPerformance] = useState({})
    const [exterior, setExterior] = useState({})
    const [interior, setInterior] = useState({})
    const [suspension_and_brakes , setSuspension_and_brakes] = useState({})
    const [tyre_and_wheels , setTyre_and_wheels] = useState({})
    const [others_features, setOthers_features] = useState({})
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        try {
            if (!img || !name || !price || !country || !brand || !modelYear || !category || !assembleIn || !description) return toast.error('Please fill all the fields')

            const formData = new FormData()
            formData.append('file', img)

            let data = {
                name,
                price: +price,
                country: country.map(c => c.value),
                brand: brand.value,
                modelYear,
                category: category.value,
                assembleIn,
                description,
                specification: {
                    engine,
                    performance,
                    exterior,
                    interior,
                    suspension_and_brakes,
                    tyre_and_wheels,
                    others_features
                },
            }
            if (color.length) {
                data.color = color.map(c => c.name)
                color.forEach(c => formData.append('color', c.image))
            }
            setLoading(true)
            formData.append('data', JSON.stringify(data))
            const { data: res } = await axios.post('/car', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setLoading(false)
            toast.success('Car created successfully')
            navigate('/dashboard/cars')
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error('Failed to create car')
        }
    }



    const handleChange = (e, setState, type) => {
        const name = e.target.name
        const value = type === 'number' ? +e.target.value : e.target.value
        setState(prev => ({ ...prev, [name]: value }))
    }

    const getValue = (name, state) => {
        return state[name] || ''
    }

    const saveColor = () => {
        if (!colorName || !colorImage) return toast.error('Please fill all the fields')
        const newColor = {
            name: colorName,
            image: colorImage
        }
        setColor(prev => [...prev, newColor])
        setColorName('')
        setColorImage(null)
        setShowAddColor(false)
    }


    return (
        <div>
            <div className="mb-4">
                <p className="text-xs md:text-sm pb-2 font-medium">Car Image*</p>
                <div className="h-[120px] w-[120px] lg:h-[230px] lg:w-[230px] bg-slate-200 relative cursor-pointer">
                    <FaRegImage className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 text-3xl lg:text-5xl text-gray-500" />
                    <label htmlFor="bike-image" className="absolute top-0 left-0 w-full h-full cursor-pointer z-50"></label>
                    {img && <img src={URL.createObjectURL(img)} alt="bike" className="w-full h-full z-40 absolute top-0 left-0" />}
                    <input
                        onChange={(e) => setImg(e.target.files[0])}
                        id="bike-image" type="file" className="hidden" />
                </div>
            </div>
            <div className="grid gap-4 gap-x-8 grid-cols-1 md:grid-cols-2">
                <div>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Car Name*"
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type="text" name="" id="" />
                </div>
                <div>
                    <input
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Car Price*"
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type="number" name="" id="" />
                </div>
                <div>
                    <Select
                        isMulti
                        name="colors"
                        onChange={(e) => setCountry(e)}
                        value={country}
                        options={countries}
                        placeholder="Select Country*"
                        className="basic-multi-select bg-white text-black w-full "
                        classNamePrefix="select"
                    />
                </div>
                <div>
                    <Select
                        name="brand"
                        onChange={(e) => setBrand(e)}
                        value={brand}
                        options={allBrands.map(b => ({ value: b.name, label: b.name }))}
                        placeholder="Select Brand*"
                        className="basic-single bg-white text-black w-full "
                        classNamePrefix="select"
                    />
                </div>
                <div>
                    <Select
                        name="brand"
                        onChange={(e) => setCategory(e)}
                        value={category}
                        options={allCategories.map(b => ({ value: b._id, label: b.name }))}
                        placeholder="Select Category*"
                        className="basic-single bg-white text-black w-full "
                        classNamePrefix="select"
                    />
                </div>
                <div>
                    <p>Model Year</p>
                    <input
                        value={modelYear}
                        onChange={(e) => setModelYear(e.target.value)}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type="date" name="" id="" />
                </div>
                <div>
                    <input
                        placeholder="Assemble In*"
                        value={assembleIn}
                        onChange={(e) => setAssembleIn(e.target.value)}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type="text" name="" id="" />
                </div>
                <div>
                    <textarea
                        placeholder="Description*"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        name="" id=""></textarea>
                </div>
            </div>

            <p className="mt-5 text-lg md:text-xl font-medium ">Engine</p>
            <div className="grid gap-4 gap-x-8 mt-2 grid-cols-1 md:grid-cols-2">
                {engineFields.map((f, i) => <div key={i}>
                    <input
                        value={getValue(f.name, engine)}
                        onChange={(e) => handleChange(e, setEngine, f.type)}
                        placeholder={f.placeholder}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type={f.type} name={f.name} id={f.name} />
                </div>)}
            </div>

            <p className="mt-5 text-lg md:text-xl font-medium ">Performance</p>
            <div className="grid gap-4 gap-x-8 mt-2 grid-cols-1 md:grid-cols-2">
                {performanceFields.map((f, i) => <div key={i}>
                    <input
                        value={getValue(f.name, performance)}
                        onChange={(e) => handleChange(e, setPerformance, f.type)}
                        placeholder={f.placeholder}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type={f.type} name={f.name} id={f.name} />
                </div>)}
            </div>

            <p className="mt-5 text-lg md:text-xl font-medium ">Exterior</p>
            <div className="grid gap-4 gap-x-8 mt-2 grid-cols-1 md:grid-cols-2">
                {exteriorFields.map((f, i) => <div key={i}>
                    <input
                        value={getValue(f.name, exterior)}
                        onChange={(e) => handleChange(e, setExterior, f.type)}
                        placeholder={f.placeholder}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type={f.type} name={f.name} id={f.name} />
                </div>)}
            </div>

            <p className="mt-5 text-lg md:text-xl font-medium ">Interior</p>
            <div className="grid gap-4 gap-x-8 mt-2 grid-cols-1 md:grid-cols-2">
                {interiorFields.map((f, i) => <div key={i}>
                    <input
                        value={getValue(f.name, interior)}
                        onChange={(e) => handleChange(e, setInterior, f.type)}
                        placeholder={f.placeholder}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type={f.type} name={f.name} id={f.name} />
                </div>)}
            </div>

            <p className="mt-5 text-lg md:text-xl font-medium ">Suspension And Brakes</p>
            <div className="grid gap-4 gap-x-8 mt-2 grid-cols-1 md:grid-cols-2">
                {suspensionAndBrakesFields.map((f, i) => <div key={i}>
                    <input

                        value={getValue(f.name, suspension_and_brakes)}
                        onChange={(e) => handleChange(e, setSuspension_and_brakes, f.type)}
                        placeholder={f.placeholder}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type={f.type} name={f.name} id={f.name} />
                </div>)}
            </div>

            <p className="mt-5 text-lg md:text-xl font-medium ">Tyre And Wheels</p>
            <div className="grid gap-4 gap-x-8 mt-2 grid-cols-1 md:grid-cols-2">
                {tyreAndWheelsFields.map((f, i) => <div key={i}>
                    <input

                        value={getValue(f.name, tyre_and_wheels)}
                        onChange={(e) => handleChange(e, setTyre_and_wheels, f.type)}
                        placeholder={f.placeholder}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type={f.type} name={f.name} id={f.name} />
                </div>)}
            </div>

            <p className="mt-5 text-lg md:text-xl font-medium ">Other Features</p>
            <div className="grid gap-4 gap-x-8 mt-2 grid-cols-1 md:grid-cols-2">
                {otherFeaturesFields.map((f, i) => <div key={i}>
                    <input
                        value={getValue(f.name, others_features)}
                        onChange={(e) => handleChange(e, setOthers_features, f.type)}
                        placeholder={f.placeholder}
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type={f.type} name={f.name} id={f.name} />
                </div>)}
            </div>

           
            <div className="mt-7">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {color.map((c, i) => <div className="bg-white relative p-2 mb-3 rounded-md text-center border" key={i}>
                        <span
                            onClick={() => setColor(prev => prev.filter((_, index) => index !== i))}
                            className="absolute top-3 right-3 text-xl cursor-pointer text-gray-800">&#10006;</span>
                        <img src={URL.createObjectURL(c.image)} alt={c.name} className="w-[100px] h-[100px]  rounded-md mx-auto " />
                        <p>{c.name}</p>
                    </div>)}
                </div>
                {!showAddColor && <button
                    onClick={() => setShowAddColor(true)}
                    className="btn btn-success btn-sm text-white">add color +</button>}
                {showAddColor && <div className="flex items-center flex-col md:flex-row gap-3">
                    <input
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        placeholder="Color Name*"
                        className="w-full  p-2 border rounded-md shadow-sm bg-white outline-none"
                        type="text" name="" id="" />
                    <input
                        onChange={(e) => setColorImage(e.target.files[0])}
                        type="file" className="file-input bg-white  file-input-bordered w-full " />
                    <div className="flex gap-2">
                        <button
                            onClick={saveColor}
                            className="btn btn-success text-white ">Save</button>
                        <button
                            onClick={() => setShowAddColor(false)}
                            className="btn btn-error text-white ">cancel</button>
                    </div>
                </div>}
            </div>
            <div className="mt-7 flex justify-center">
                <button
                    onClick={onSubmit}
                    className="btn btn-primary">
                    <ButtonLoader loading={loading} >
                        Create
                    </ButtonLoader>
                </button>
            </div>
        </div>
    );
};

export default AddCar;