/* eslint-disable react-hooks/exhaustive-deps */
import {
  Drawer,
  DrawerBody, DrawerContent, DrawerHeader,
  DrawerOverlay, useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const RefProdDetail = ({ fcskid }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [productData, setProductData] = useState([])

  const fetchData = async () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const res = await fetch(`${process.env.API_HOST}/refprod?offset=1&limit=1&fcprod=${fcskid}`, requestOptions)
    if (res.ok) {
      const data = await res.json()
      console.dir(data.data)
      setProductData(data.data)
    }
  };

  useEffect(() => {
    // fetchData();
    if(isOpen) {
      fetchData();
    }
  }, [isOpen]);
  return (
    <>
      <span
        className={`btn btn-sm btn-ghost btn-circle hover:cursor-pointer hover:text-gray-50 hover:bg-rose-600`}
        onClick={onOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </span>
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="md">
        <DrawerOverlay />
        {productData.length > 0 ? (
          <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <p>No.:&nbsp;<span className="text-gray-600">{productData[0].product.fccode}</span></p>
            <p>Name.:&nbsp;<span className="text-gray-600">{productData[0].product.fcname}</span></p>
          </DrawerHeader>
          <DrawerBody>
            <p>FROM WHOUSE:&nbsp;<span className="text-blue-600">{productData[0].glref.from_whs.code}-{productData[0].glref.from_whs.name}</span></p>
            <p>TO WHOUSE:&nbsp;<span className="text-blue-600">{productData[0].glref.to_whs.code}-{productData[0].glref.from_whs.name}</span></p>
          </DrawerBody>
        </DrawerContent>
        ): ("")}
      </Drawer>
    </>
  );
};

export default RefProdDetail;
