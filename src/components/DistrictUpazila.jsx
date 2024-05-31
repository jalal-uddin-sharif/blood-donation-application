import React, { useState } from "react";

const DistrictUpazila = () => {
  const location = [
    {
      district: "Chittagong",
      Upazila: ["Rangunia", "Raojan"],
    },
    {
      district: "Dhaka",
      Upazila: ["Badda", "Banani"],
    },
  ];

  const [district, setDistrict] = useState();
  const [upazila, setUpazila] = useState()
  const handleDistrict = (e) => {
    setDistrict(e.target.value);
  };

  const handleUpazila = e =>{
    setUpazila(e.target.value)
  }

  return (
    <div className="space-y-3">
      <div>
      <select required
        onChange={handleDistrict}
        className="select select-primary w-full max-w-xs focus:outline-none"
      >
        <option disabled selected>
          Select your District
        </option>
        {location?.map((loca, idx) => (
          <option key={idx} value={loca.district}>
            {loca.district}
          </option>
        ))}
      </select>
      </div>

      {/* Upazila */}
   <div>
   {district && 
      
      <select required 
       onChange={handleUpazila}
       className="select select-primary w-full max-w-xs focus:outline-none"
     >
       <option disabled selected>
         Select Upazila
       </option>
       {
          location.map((data)=>(
           data.district === district && data.Upazila.map((upa, idx)=>(
               <option key={idx} value={upa}>{upa}</option>
           ))
          ))
       }
     </select>
     }
   </div>
     
    </div>
  );
};

export default DistrictUpazila;
