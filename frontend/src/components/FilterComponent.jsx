import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setsearchInhome } from "@/redux/jobSlice";

export default function FilterComponent() {
const [selectValue,setSelectValue]=useState('');
const dispatch = useDispatch();

const changeHandler=(value)=>{
  setSelectValue(value);
}

useEffect(()=>{
  dispatch(setsearchInhome(selectValue))
},[selectValue])

  const filterData = [
    {
      title: "Location",
      options: ["Ahmedabad", "Mumbai", "Bangalore", "Delhi NCR", "pune"],
    },
    {
      title: "Industry",
      options: ["Frontend", "Backend", "FullStack", "Ai Enginner"],
    },
    {
      title: "Salary",
      options: ["0 - 40K", "40K - 1 Lakh", "1 Lakh - 10 Lakh", "10 Lakh - 20 Lakh"],
    },
  ];

  return (
    <>
      <h1>Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1>{data.title}</h1>
              {
                data.options.map((o, index) => (
                  <div className="flex items-center space-x-2 my-2" key={index}>
                    <RadioGroupItem value={o} />
                    <Label>{o}</Label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </RadioGroup>
    </>
  );
}