import React, { useState } from "react";

const DistrictUpazila = ({ setDistrict, setUpazila, district, upazila, defaultValue, label }) => {
  const location = [
    {
      district: "Bagerhat",
      Upazila: [
        "Bagerhat Sadar",
        "Chitalmari",
        "Fakirhat",
        "Kachua",
        "Mollahat",
        "Mongla",
        "Morrelganj",
        "Rampal",
        "Sarankhola",
      ],
    },
    {
      district: "Bandarban",
      Upazila: [
        "Bandarban Sadar",
        "Thanchi",
        "Lama",
        "Naikhongchhari",
        "Rowangchhari",
        "Ruma",
        "Alikadam",
      ],
    },
    {
      district: "Barguna",
      Upazila: [
        "Amtali",
        "Bamna",
        "Barguna Sadar",
        "Betagi",
        "Patharghata",
        "Taltali",
      ],
    },
    {
      district: "Barishal",
      Upazila: [
        "Agailjhara",
        "Babuganj",
        "Bakerganj",
        "Banaripara",
        "Barishal Sadar",
        "Gournadi",
        "Hizla",
        "Mehendiganj",
        "Muladi",
        "Wazirpur",
      ],
    },
    {
      district: "Bhola",
      Upazila: [
        "Bhola Sadar",
        "Burhanuddin",
        "Char Fasson",
        "Daulatkhan",
        "Lalmohan",
        "Manpura",
        "Tazumuddin",
      ],
    },
    {
      district: "Bogura",
      Upazila: [
        "Adamdighi",
        "Bogura Sadar",
        "Dhunat",
        "Dhupchanchia",
        "Gabtali",
        "Kahaloo",
        "Nandigram",
        "Sariakandi",
        "Shajahanpur",
        "Sherpur",
        "Shibganj",
        "Sonatola",
      ],
    },
    {
      district: "Brahmanbaria",
      Upazila: [
        "Brahmanbaria Sadar",
        "Ashuganj",
        "Bancharampur",
        "Bijoynagar",
        "Kasba",
        "Nabinagar",
        "Nasirnagar",
        "Sarail",
        "Akhaura",
      ],
    },
    {
      district: "Chandpur",
      Upazila: [
        "Chandpur Sadar",
        "Faridganj",
        "Haimchar",
        "Haziganj",
        "Kachua",
        "Matlab Dakshin",
        "Matlab Uttar",
        "Shahrasti",
      ],
    },
    {
      district: "Chattogram",
      Upazila: [
        "Anwara",
        "Banshkhali",
        "Boalkhali",
        "Chandanaish",
        "Fatikchhari",
        "Hathazari",
        "Lohagara",
        "Mirsharai",
        "Patiya",
        "Rangunia",
        "Raozan",
        "Sandwip",
        "Satkania",
        "Sitakunda",
        "Chattogram City Corporation",
      ],
    },
    {
      district: "Chuadanga",
      Upazila: ["Alamdanga", "Chuadanga Sadar", "Damurhuda", "Jibannagar"],
    },
    {
      district: "Cox's Bazar",
      Upazila: [
        "Chakaria",
        "Cox's Bazar Sadar",
        "Kutubdia",
        "Maheshkhali",
        "Ramu",
        "Teknaf",
        "Ukhia",
        "Pekua",
      ],
    },
    {
      district: "Cumilla",
      Upazila: [
        "Barura",
        "Brahmanpara",
        "Burichang",
        "Chandina",
        "Chauddagram",
        "Daudkandi",
        "Debidwar",
        "Homna",
        "Laksam",
        "Lalmai",
        "Muradnagar",
        "Nangalkot",
        "Cumilla Sadar Dakshin",
        "Cumilla Adarsha Sadar",
        "Meghna",
        "Monohorgonj",
        "Titas",
      ],
    },
    {
      district: "Dhaka",
      Upazila: [
        "Dhamrai",
        "Dohar",
        "Keraniganj",
        "Nawabganj",
        "Savar",
        "Dhaka City Corporation (North)",
        "Dhaka City Corporation (South)",
      ],
    },
    {
      district: "Dinajpur",
      Upazila: [
        "Birampur",
        "Birganj",
        "Biral",
        "Bochaganj",
        "Chirirbandar",
        "Phulbari",
        "Ghoraghat",
        "Hakimpur",
        "Kaharole",
        "Khansama",
        "Dinajpur Sadar",
        "Nawabganj",
        "Parbatipur",
      ],
    },
    {
      district: "Faridpur",
      Upazila: [
        "Alfadanga",
        "Bhanga",
        "Boalmari",
        "Charbhadrasan",
        "Faridpur Sadar",
        "Madhukhali",
        "Nagarkanda",
        "Sadarpur",
        "Saltha",
      ],
    },
    {
      district: "Feni",
      Upazila: [
        "Chhagalnaiya",
        "Daganbhuiyan",
        "Feni Sadar",
        "Parshuram",
        "Fulgazi",
        "Sonagazi",
      ],
    },
    {
      district: "Gaibandha",
      Upazila: [
        "Phulchhari",
        "Gaibandha Sadar",
        "Gobindaganj",
        "Palashbari",
        "Sadullapur",
        "Saghata",
        "Sundarganj",
      ],
    },
    {
      district: "Gazipur",
      Upazila: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur"],
    },
    {
      district: "Gopalganj",
      Upazila: [
        "Gopalganj Sadar",
        "Kashiani",
        "Kotalipara",
        "Muksudpur",
        "Tungipara",
      ],
    },
    {
      district: "Habiganj",
      Upazila: [
        "Ajmiriganj",
        "Bahubal",
        "Baniachong",
        "Chunarughat",
        "Habiganj Sadar",
        "Lakhai",
        "Madhabpur",
        "Nabiganj",
        "Shaistagonj",
      ],
    },
    {
      district: "Jamalpur",
      Upazila: [
        "Baksiganj",
        "Dewanganj",
        "Islampur",
        "Jamalpur Sadar",
        "Madarganj",
        "Melandaha",
        "Sarishabari",
      ],
    },
    {
      district: "Jashore",
      Upazila: [
        "Abhaynagar",
        "Bagherpara",
        "Chaugachha",
        "Jashore Sadar",
        "Jhikargachha",
        "Keshabpur",
        "Manirampur",
        "Sharsha",
      ],
    },
    {
      district: "Jhalokathi",
      Upazila: ["Jhalokathi Sadar", "Kathalia", "Nalchity", "Rajapur"],
    },
    {
      district: "Jhenaidah",
      Upazila: [
        "Harinakunda",
        "Jhenaidah Sadar",
        "Kaliganj",
        "Kotchandpur",
        "Maheshpur",
        "Shailkupa",
      ],
    },
    {
      district: "Joypurhat",
      Upazila: ["Akkelpur", "Joypurhat Sadar", "Kalai", "Khetlal", "Panchbibi"],
    },
    {
      district: "Khagrachari",
      Upazila: [
        "Dighinala",
        "Khagrachari Sadar",
        "Lakshmichhari",
        "Mahalchhari",
        "Manikchhari",
        "Matiranga",
        "Panchhari",
        "Ramgarh",
      ],
    },
    {
      district: "Khulna",
      Upazila: [
        "Batiaghata",
        "Dacope",
        "Dumuria",
        "Dighalia",
        "Koyra",
        "Paikgachha",
        "Phultala",
        "Rupsha",
        "Terokhada",
        "Khalishpur",
        "Khan Jahan Ali",
        "Daulatpur",
        "Sonadanga",
        "Harintana",
      ],
    },
    {
      district: "Kishoreganj",
      Upazila: [
        "Austagram",
        "Bajitpur",
        "Bhairab",
        "Hossainpur",
        "Itna",
        "Karimganj",
        "Katiadi",
        "Kishoreganj Sadar",
        "Kuliarchar",
        "Mithamain",
        "Nikli",
        "Pakundia",
        "Tarail",
      ],
    },
    {
      district: "Kurigram",
      Upazila: [
        "Bhurungamari",
        "Char Rajibpur",
        "Chilmari",
        "Kurigram Sadar",
        "Nageshwari",
        "Phulbari",
        "Rajarhat",
        "Raomari",
        "Ulipur",
      ],
    },
    {
      district: "Kushtia",
      Upazila: [
        "Bheramara",
        "Daulatpur",
        "Khoksa",
        "Kumarkhali",
        "Kushtia Sadar",
        "Mirpur",
      ],
    },
    {
      district: "Lakshmipur",
      Upazila: [
        "Lakshmipur Sadar",
        "Raipur",
        "Ramganj",
        "Ramgati",
        "Kamalnagar",
      ],
    },
    {
      district: "Lalmonirhat",
      Upazila: [
        "Aditmari",
        "Hatibandha",
        "Kaliganj",
        "Lalmonirhat Sadar",
        "Patgram",
      ],
    },
    {
      district: "Madaripur",
      Upazila: ["Rajoir", "Madaripur Sadar", "Kalkini", "Shibchar"],
    },
    {
      district: "Magura",
      Upazila: ["Magura Sadar", "Mohammadpur", "Shalikha", "Sreepur"],
    },
    {
      district: "Manikganj",
      Upazila: [
        "Daulatpur",
        "Ghior",
        "Harirampur",
        "Manikganj Sadar",
        "Saturia",
        "Shivalaya",
        "Singair",
      ],
    },
    {
      district: "Meherpur",
      Upazila: ["Gangni", "Meherpur Sadar", "Mujibnagar"],
    },
    {
      district: "Moulvibazar",
      Upazila: [
        "Barlekha",
        "Kamalganj",
        "Kulaura",
        "Moulvibazar Sadar",
        "Rajnagar",
        "Sreemangal",
        "Juri",
      ],
    },
    {
      district: "Munshiganj",
      Upazila: [
        "Gazaria",
        "Lohajang",
        "Munshiganj Sadar",
        "Sirajdikhan",
        "Sreenagar",
        "Tongibari",
      ],
    },
    {
      district: "Mymensingh",
      Upazila: [
        "Bhaluka",
        "Dhobaura",
        "Fulbaria",
        "Gaffargaon",
        "Gauripur",
        "Haluaghat",
        "Ishwarganj",
        "Mymensingh Sadar",
        "Muktagachha",
        "Nandail",
        "Phulpur",
        "Trishal",
        "Tarakanda",
      ],
    },
    {
      district: "Naogaon",
      Upazila: [
        "Atrai",
        "Badalgachhi",
        "Manda",
        "Dhamoirhat",
        "Mohadevpur",
        "Naogaon Sadar",
        "Niamatpur",
        "Patnitala",
        "Porsha",
        "Raninagar",
        "Sapahar",
      ],
    },
    {
      district: "Narail",
      Upazila: ["Kalia", "Lohagara", "Narail Sadar"],
    },
    {
      district: "Narayanganj",
      Upazila: [
        "Araihazar",
        "Bandar",
        "Narayanganj Sadar",
        "Rupganj",
        "Sonargaon",
      ],
    },
    {
      district: "Narsingdi",
      Upazila: [
        "Belabo",
        "Monohardi",
        "Narsingdi Sadar",
        "Palash",
        "Raipura",
        "Shibpur",
      ],
    },
    {
      district: "Natore",
      Upazila: [
        "Bagatipara",
        "Baraigram",
        "Gurudaspur",
        "Lalpur",
        "Natore Sadar",
        "Singra",
      ],
    },
    {
      district: "Netrokona",
      Upazila: [
        "Atpara",
        "Barhatta",
        "Durgapur",
        "Khaliajuri",
        "Kalmakanda",
        "Kendua",
        "Madan",
        "Mohanganj",
        "Netrokona Sadar",
        "Purbadhala",
      ],
    },
    {
      district: "Nilphamari",
      Upazila: [
        "Dimla",
        "Domar",
        "Jaldhaka",
        "Kishoreganj",
        "Nilphamari Sadar",
        "Saidpur",
      ],
    },
    {
      district: "Noakhali",
      Upazila: [
        "Begumganj",
        "Chatkhil",
        "Companiganj",
        "Hatiya",
        "Noakhali Sadar",
        "Senbagh",
        "Sonaimuri",
        "Subarnachar",
        "Kabirhat",
      ],
    },
    {
      district: "Pabna",
      Upazila: [
        "Atgharia",
        "Bera",
        "Bhangura",
        "Chatmohar",
        "Faridpur",
        "Ishwardi",
        "Pabna Sadar",
        "Santhia",
        "Sujanagar",
      ],
    },
    {
      district: "Panchagarh",
      Upazila: ["Atwari", "Boda", "Debiganj", "Panchagarh Sadar", "Tetulia"],
    },
    {
      district: "Patuakhali",
      Upazila: [
        "Bauphal",
        "Dashmina",
        "Galachipa",
        "Kalapara",
        "Mirzaganj",
        "Patuakhali Sadar",
        "Rangabali",
        "Dumki",
      ],
    },
    {
      district: "Pirojpur",
      Upazila: [
        "Bhandaria",
        "Kawkhali",
        "Mathbaria",
        "Nazirpur",
        "Nesarabad (Swarupkathi)",
        "Pirojpur Sadar",
        "Zianagar",
      ],
    },
    {
      district: "Rajbari",
      Upazila: [
        "Baliakandi",
        "Goalandaghat",
        "Pangsha",
        "Kalukhali",
        "Rajbari Sadar",
      ],
    },
    {
      district: "Rajshahi",
      Upazila: [
        "Bagha",
        "Bagmara",
        "Charghat",
        "Durgapur",
        "Godagari",
        "Mohanpur",
        "Paba",
        "Puthia",
        "Tanore",
        "Rajshahi City Corporation",
      ],
    },
    {
      district: "Rangamati",
      Upazila: [
        "Bagaichhari",
        "Barkal",
        "Kawkhali",
        "Belaichhari",
        "Kaptai",
        "Juraichhari",
        "Langadu",
        "Naniarchar",
        "Rajasthali",
        "Rangamati Sadar",
      ],
    },
    {
      district: "Rangpur",
      Upazila: [
        "Badarganj",
        "Gangachhara",
        "Kaunia",
        "Rangpur Sadar",
        "Mithapukur",
        "Pirgachha",
        "Pirganj",
        "Taraganj",
      ],
    },
    {
      district: "Satkhira",
      Upazila: [
        "Assasuni",
        "Debhata",
        "Kalaroa",
        "Kaliganj",
        "Satkhira Sadar",
        "Shyamnagar",
        "Tala",
      ],
    },
    {
      district: "Shariatpur",
      Upazila: [
        "Bhedarganj",
        "Damudya",
        "Gosairhat",
        "Naria",
        "Shariatpur Sadar",
        "Zajira",
        "Shakhipur",
      ],
    },
    {
      district: "Sherpur",
      Upazila: [
        "Jhenaigati",
        "Nakla",
        "Nalitabari",
        "Sherpur Sadar",
        "Sreebardi",
      ],
    },
    {
      district: "Sirajganj",
      Upazila: [
        "Belkuchi",
        "Chauhali",
        "Kamarkhanda",
        "Kazipur",
        "Raiganj",
        "Shahjadpur",
        "Sirajganj Sadar",
        "Tarash",
        "Ullahpara",
      ],
    },
    {
      district: "Sunamganj",
      Upazila: [
        "Bishwamvarpur",
        "Chhatak",
        "Derai",
        "Dharampasha",
        "Dowarabazar",
        "Jagannathpur",
        "Jamalganj",
        "Sullah",
        "Sunamganj Sadar",
        "Tahirpur",
        "Shalla",
      ],
    },
    {
      district: "Sylhet",
      Upazila: [
        "Balaganj",
        "Beanibazar",
        "Bishwanath",
        "Companiganj",
        "Dakshin Surma",
        "Fenchuganj",
        "Golapganj",
        "Gowainghat",
        "Jaintiapur",
        "Kanaighat",
        "Sylhet Sadar",
        "Zakiganj",
        "Osmaninagar",
      ],
    },
    {
      district: "Tangail",
      Upazila: [
        "Basail",
        "Bhuapur",
        "Delduar",
        "Dhanbari",
        "Gopalpur",
        "Ghatail",
        "Kalihati",
        "Madhupur",
        "Mirzapur",
        "Nagarpur",
        "Sakhipur",
        "Tangail Sadar",
      ],
    },
    {
      district: "Thakurgaon",
      Upazila: [
        "Baliadangi",
        "Haripur",
        "Pirganj",
        "Ranisankail",
        "Thakurgaon Sadar",
      ],
    },
  ];

  const handleDistrict = (e) => {
    setUpazila(undefined);
    setDistrict(e.target.value);
  };

  const handleUpazila = (e) => {
    setUpazila(e.target.value);
  };

  return (
    <div className=" flex gap-4 w-full">
      <div className="w-full flex flex-col gap-1">
        {
          !label &&

    <label htmlFor="">District</label>
        }
        <select
        defaultValue={district}
          required
          onChange={handleDistrict}
          className="select select-primary w-full max-w-xs focus:outline-none"
        >
         {!defaultValue && <option>Select district</option>}
          {location?.map((loca, idx) => (
            <option key={idx} value={loca.district}>
              {loca.district}
            </option>
          ))}
        </select>
      </div>

      {/* Upazila */}
      <div className="w-full flex flex-col gap-1">
        {district && (
            <>
            {
              !label && 
    <label htmlFor="">Upazila</label>
            }
             <select
            required
            defaultValue={upazila}
            onChange={handleUpazila}
            className="select select-primary w-full max-w-xs focus:outline-none"
          >
            <option>Select Upazila</option>

            {location.map(
              (data) =>
                data.district === district &&
                data.Upazila.map((upa, idx) => (
                  <option key={idx} value={upa}>
                    {upa}
                  </option>
                ))
            )}
          </select>
            </>
         
        )}
      </div>
    </div>
  );
};

export default DistrictUpazila;
