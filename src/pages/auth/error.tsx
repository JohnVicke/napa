import { GetServerSidePropsContext } from "next/types";
import React from "react";

interface ErrorProps {
  errors?: any;
}

const Error = ({ errors }: ErrorProps) => {
  return (
    <div>
      <h1>{JSON.stringify(errors)}</h1>
    </div>
  );
};

export default Error;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  return {
    props: {
      errors: ctx.query.errors,
    },
  };
};
