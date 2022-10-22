import { GetServerSideProps } from "next";
import React from "react";
import { Planet } from "../api/SwapiTypes";

const Planet = ({ data }: { data: Planet }) => {
  console.log("DATA planet", data);
  return <div>{data.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/planets/${context.query.planetId}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

export default Planet;
