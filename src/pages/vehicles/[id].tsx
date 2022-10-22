import { GetServerSideProps } from "next";
import React from "react";
import { Vehicle } from "../api/SwapiTypes";

const Vehicle = ({ data }: { data: Vehicle }) => {
  console.log("DATA vehicle", data);
  return <div>{data.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/vehicles/${context.query.vehicleId}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

export default Vehicle;
