import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { getAuthSession } from "../../utils/getAuthSession";
import { withAuthServerSideProps } from "../../utils/withAuthServerSideProps";

const getHourMinutePadded = (date: Date) =>
  date.toLocaleTimeString("default", { hour: "2-digit", minute: "2-digit" });

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type TimeEntryProps = {
  date: Date;
  total: number;
  scheduled: number;
  clockIn: Date;
  clockOut: Date;
};

type StatProps = {
  title: string;
  value: number;
  desc: string;
  severity?: "success" | "warning" | "error" | "none";
};

const Stat: React.FC<StatProps> = ({
  title,
  value,
  desc,
  severity = "none",
}) => {
  return (
    <div className="stat">
      <div className="stat-title">{title}</div>
      <div className={`stat-value text-${severity}`}>{value}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  );
};

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Summary</h2>
      <div className="stats stats-vertical md:stats-horizontal shadow pt-2">
        <Stat
          title="Total hours worked"
          desc="Logged on time-keeper"
          value={34}
        />
        <Stat
          title="Flex"
          desc="Remember to take some time off!"
          value={2}
          severity="success"
        />
      </div>
      <Link href="/workweek/1">
        <button className="btn btn-primary my-6">go to this week</button>
      </Link>
      <div>
        Week history here history here !/!{" "}
        <span>vecka 2 - jobbade 42 timmar</span>
      </div>
      <div>
        Week history here history here !/!{" "}
        <span>vecka 2 - jobbade 42 timmar</span>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = withAuthServerSideProps(async () => {
  return {
    props: {},
  };
});
