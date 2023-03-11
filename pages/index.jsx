/* eslint-disable react-hooks/exhaustive-deps */
import { RefProdDetail, TableStock } from "@/components";
import { DateTime } from "@/hooks";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Tooltip } from "@chakra-ui/react";

const IndexPage = () => {
  const [whsData, setWhsData] = useState([]);
  const [whsId, setWhsId] = useState("0");
  const [productCode, setProductCode] = useState("");
  const [productData, setProductData] = useState([]);
  const [pageNum, setPageNum] = useState(1);

  const fetchWhsData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(`${process.env.API_HOST}/whs`, requestOptions);
    if (res.ok) {
      const data = await res.json();
      setWhsData(data.data);
    }
  };

  const fetchProductData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/stock?offset=${pageNum}&limit=20`,
      requestOptions
    );
    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setProductData(data.data);
    }
  };

  const searchProductData = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const res = await fetch(
      `${process.env.API_HOST}/stock?offset=1&limit=20&partno=${productCode}`,
      requestOptions
    );
    if (res.ok) {
      const data = await res.json();
      console.dir(data.data);
      setProductData(data.data);
    }
  };

  useEffect(() => {
    fetchWhsData();
    fetchProductData();
  }, []);

  useEffect(() => {
    fetchProductData();
  }, [pageNum]);

  useEffect(() => {
    searchProductData();
  }, [productCode]);

  return (
    <>
      <Head>
        <title>{process.env.APP_NAME}</title>
        <meta name="description" content={process.env.APP_DESCRIPTION} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between">
          <div className="flex justify-start">
            {/* <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-sm w-full max-w-xs"
              value={productCode}
              onChange={e => setProductCode(e.target.value)}
            /> */}
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Search…"
                  className="input input-bordered input-sm w-full max-w-xs"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                />
                <button className="btn btn-square btn-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            {/* <select
              className="select select-sm w-full max-w-xs"
              defaultValue={whsId}
              onChange={(e) => setWhsId(e.target.value)}
            >
              <option disabled value={`0`}>
                WHS
              </option>
              {whsData?.map((i, x) => (
                <option key={i.fcskid} value={i.fcskid}>{`${i.code.replace(
                  /^\s+|\s+$/gm,
                  ""
                )}-${i.name.replace(/^\s+|\s+$/gm, "")}`}</option>
              ))}
            </select> */}
          </div>
        </div>
        <div className="overflow-x-auto mt-2">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Part No.</th>
                <th>Part Name</th>
                <th>WHS</th>
                <th>Qty</th>
                <th>Last Updated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {productData.map((i, e) => (
                <tr key={i.fcskid}>
                  <th>{e + 1}</th>
                  <td>{i.product.fccode}</td>
                  <td>
                    <Tooltip label={`${i.product.product_type.fccode}-${i.product.product_type.fcname}`}>
                      <span className="text-blue-800">{i.product.fcname}</span>
                    </Tooltip>
                  </td>
                  <td>{`${i.whs.code}-${i.whs.name}`}</td>
                  <td>
                    <strong className={i.fnqty > 0 ? "" : "text-rose-800"}>
                      {i.fnqty.toLocaleString()}
                    </strong>
                  </td>
                  <td>{DateTime(i.ftlastupd)}</td>
                  <td>
                    <RefProdDetail fcskid={i.product.fcskid} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <div className="btn-group">
            <button
              className={
                pageNum <= 1 ? `btn btn-disabled btn-sm` : `btn btn-sm`
              }
              onClick={() => setPageNum(pageNum - 1)}
            >
              «
            </button>
            {pageNum > 1 && (
              <>
                <button className="btn btn-sm" onClick={() => setPageNum(1)}>
                  1
                </button>
              </>
            )}
            <button className="btn btn-sm btn-primary">Page {pageNum}</button>
            <button
              className="btn btn-sm"
              onClick={() => setPageNum(pageNum + 1)}
            >
              »
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default IndexPage;
