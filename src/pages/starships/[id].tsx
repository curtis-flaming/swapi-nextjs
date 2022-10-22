import { GetServerSideProps } from "next";
import React from "react";
import { Starship } from "../api/SwapiTypes";

const Starship = ({ data }: { data: Starship }) => {
  console.log("DATA starship", data);
  return <div>{data.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/starships/${context.query.starshipId}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

export default Starship;
