import React from "react";
import { DashboardPage } from "@/modules/dashboard/DashboardPage";
import { withAuthServerSideProps } from "../utils/withAuthServerSideProps";

const Dashboard = () => <DashboardPage />;

export default Dashboard;

export const getServerSideProps = withAuthServerSideProps();
