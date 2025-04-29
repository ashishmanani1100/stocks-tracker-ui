"use client";

import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Child from "./child/page";
import { useRouter } from "next/navigation";
import { dataContext } from "@/context/authContext";
const BASE_URL = process.env.NEXT_PUBLIC_LOCAL_API_URL;

const Page = () => {
  const [tempData, setTempData] = useState([]);
  const router = useRouter();
  const { user } = useContext(dataContext);
  useEffect(() => {
    if (!user?.stsTokenManager?.accessToken){
      return;
    };

    // Create socket connection
    const socket = io(BASE_URL, {
      transports: ["websocket"],
      auth: {
        token: user?.stsTokenManager?.accessToken,
      },
    });

    socket.on("connect", () => {
      console.log("client connected!!");
    });

    socket.on("disconnect", () => {
      console.log("client disconnected!!");
    });

    socket.on("notification", (data) => {
      setTempData((prevData) => {
        const updatedData = [...prevData];
        const existingIndex = updatedData.findIndex(item => item?.s === data?.data?.s);

        if (existingIndex !== -1) {
          updatedData[existingIndex] = { ...updatedData[existingIndex], ...data?.data };
        } else if (data?.data?.s) {
          updatedData.push(data?.data);
        }
        return updatedData;
      });
    });

    // cleanup function
    return () => {
      socket.disconnect();
      console.log("Socket disconnected!");
    };
  }, [user]);

  return (
    <>
      <div>Dashboard Page</div>
      <Child data={tempData}></Child>
    </>
  );
};

export default Page;
