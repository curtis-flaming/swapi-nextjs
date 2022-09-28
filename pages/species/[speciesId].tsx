import { GetServerSideProps } from "next";
import React from "react";
import { Species } from "../api/types";

const Species = ({ data }: { data: Species }) => {
  console.log("DATA species", data);
  return <div>{data.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/species/${context.query.speciesId}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

export default Species;
