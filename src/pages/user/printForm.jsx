/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Header from "../../components/common/header";
import {
  Calender,
  UserIcon,
  ContactIcon,
  PhoneIcon,
  TimeIcon,
  QueryIcon,
  AlarmIcon,
  GroupIcon,
} from "../../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function PrintForm() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState([]);
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId"); // Get the user ID from local storage
    if (userId) {
      fetchUserDetails(userId);
    }
  }, []);

  const fetchUserDetails = (userId) => {
    const apiUrl = `https://vms-backend.up.railway.app/api/visitor/${userId}`;
    axios
      .get(apiUrl)
      .then((response) => {
        // Handle the response data
        const data = response.data;
        // Process the data as needed
        setUserDetail(data.visitor);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });

    // Get(url, (response, error) => {
    //   if (response) {
    //     setUserDetail(response); // Set the user details in state
    //   } else {
    //     console.error("Error:", error);
    //   }
    // });
  };

  useEffect(() => {
    if (userDetail) {
      setUserDetails([
        {
          icon: UserIcon,
          title: "ID",
          value: "NU2041A/291",
          valueExtra: "",
        },
        {
          icon: UserIcon,
          title: "Full Name",
          value: userDetail.fullName || "",
          valueExtra: userDetail.valueExtra || "",
        },
        {
          icon: ContactIcon,
          title: "Email Address",
          value: userDetail.email || "",
          valueExtra: "",
        },
        {
          icon: PhoneIcon,
          title: "Phone Number",
          value: userDetail.phoneNumber || "",
          valueExtra: "",
        },
        {
          icon: Calender,
          title: "Date",
          value: userDetail.date || "",
          valueExtra: "",
        },
        {
          icon: TimeIcon,
          title: "Time",
          value: userDetail.time || "",
          valueExtra: "WAT",
        },
        {
          icon: QueryIcon,
          title: "Reason for Visit (Optional)",
          value: userDetail.purposeOfVisit || "",
          valueExtra: "",
        },
        {
          icon: AlarmIcon,
          title: "Invite Status",
          value: "Scheduled",
          valueExtra: "",
        },
        {
          icon: GroupIcon,
          title: "Reception By",
          value: "James",
          valueExtra: "ANDREW",
        },
      ]);
    }
  }, [userDetail]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>
      <Header />
      <div className="my-10">
        <h1 className="text-black font-dmSans font-bold text-4xl text-center">
          Invite Details/Status:{" "}
          <span className="text-[#828282]">NU2041A/291</span>
        </h1>
      </div>
      <div className="py-8 w-full flex flex-col justify-center items-center">
        {userDetails.map((userDetail) => (
          <div
            key={userDetail.title}
            className="w-[70%] pt-7 h-full font-roboto flex justify-between items-center"
          >
            <div className="flex justify-center items-center gap-3">
              <div>
                <img src={userDetail?.icon} alt="" />
              </div>
              <div>
                <h3 className="w-full px-4 py-2">{userDetail?.title}</h3>
              </div>
            </div>

            <div className="text-left w-[20rem]">
              <h3 className="px-4 py-2">
                {userDetail?.value} <span>{userDetail?.valueExtra}</span>
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="flex py-10 justify-end items-center pr-10">
        <button
          type="button"
          className="bg-[#4F4F4F] font-bold w-[10rem] py-3 text-white rounded-lg outline-none border-none font-dmSans"
          onClick={handlePrint}
        >
          Print
        </button>
      </div>
    </div>
  );
}
