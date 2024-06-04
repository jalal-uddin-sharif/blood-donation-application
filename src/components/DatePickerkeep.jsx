import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerkeep = () => {
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
  const [startTime, setStartTime] = useState(new Date())

  console.log(startTime.toLocaleTimeString('en-US', { hour12: true }));
  return (
    <div className="flex gap-4">
      <div>
        <label htmlFor="">Select Date</label> <br />
        <DatePicker
        className="px-3 py-2 rounded-md cursor-pointer"
        selected={startDate}
        onChange={(date) => setStartDate(date.toLocaleDateString())}
      />
      </div>
      <div>
        <label htmlFor="">Select Time</label> <br />
        <DatePicker
         className="px-3 py-2 rounded-md cursor-pointer"
      selected={startTime}
      onChange={(date) => setStartTime(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
      </div>
    </div>
  );
};

export default DatePickerkeep;
