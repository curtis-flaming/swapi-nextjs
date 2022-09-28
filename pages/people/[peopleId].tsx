import { GetServerSideProps } from "next";
import React from "react";
import { People } from "../api/SwapiTypes";

const People = ({ data }: { data: People }) => {
  console.log("DATA people", data);
  return <div>{data.name}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `https://swapi.dev/api/people/${context.query.peopleId}`
  );
  const data = await res.json();

  return {
    props: { data },
  };
};

export default People;
