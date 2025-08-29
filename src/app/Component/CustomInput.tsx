'use client';
import { useField } from "formik";

interface Props {
    label: string;
    name: string;
    type: string;
  
  }

function CustomInput({label,...props}:Props) {
   let [field,meta]=useField(props)  
   
  return  <div className="mb-4">
    <label className="block mb-1 font-medium text-gray-700">{label}</label>
   <input
        {...field}
        {...props}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none     ${
          meta.touched && meta.error 
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
      {meta.touched && meta.error && (
        <p className="text-sm text-red-600 mt-1">{meta.error}</p>
      )}
  </div>;
}

export default CustomInput;
