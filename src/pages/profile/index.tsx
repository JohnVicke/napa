import React from "react";

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

const TimeEntry: React.FC<TimeEntryProps> = ({
  date,
  total,
  scheduled,
  clockIn,
  clockOut,
}) => {
  return (
    <div className="bg-base-300 rounded-lg p-4">
      <h3>{days[date.getDay()]}</h3>
      <div>{total}</div>
      <div>{scheduled}</div>
      <div>{getHourMinutePadded(clockIn)}</div>
      <div>{getHourMinutePadded(clockOut)}</div>
    </div>
  );
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
      <h2 className="text-2xl font-bold">
        Logged time <span className="font-normal ml-2">jan 1 - jan </span>
      </h2>
      <div className="stats stats-horizontal shadow pt-2">
        <Stat title="this week so far" desc="jan1 - jan7" value={34} />
        <Stat title="Scheduled hours" desc="jan1 - jan7" value={40} />
        <Stat
          title="Estimated flex"
          desc="jan1 - jan7"
          value={2}
          severity="success"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold pt-6">Entries this week</h2>
        <TimeEntry
          date={new Date()}
          scheduled={40}
          total={39}
          clockIn={new Date()}
          clockOut={new Date()}
        />
        <div className="pt-2" />
        <TimeEntry
          date={new Date()}
          scheduled={40}
          total={39}
          clockIn={new Date()}
          clockOut={new Date()}
        />
      </div>
    </div>
  );
};

export default Profile;
