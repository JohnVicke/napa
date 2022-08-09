import React from "react";
import { TrackTimePage } from "@/modules/track-time/TrackTimePage";
import { withAuthServerSideProps } from "../utils/withAuthServerSideProps";

const TrackTime = () => <TrackTimePage />;

export default TrackTime;

export const getServerSideProps = withAuthServerSideProps();
