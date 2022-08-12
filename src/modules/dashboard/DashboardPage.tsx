import React from "react";
import { withAuthServerSideProps } from "../../utils/withAuthServerSideProps";
import { trpc } from "@/utils/trpc";
import { useToastStore } from "@/modules/toast/toastStore";

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

export const DashboardPage = () => {
  const { data } = trpc.useQuery(["workweek.getSummary"]);
  const google = trpc.useQuery(["googleTask.getLists"]);

  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Summary</h2>
      <div className="stats stats-vertical pt-2 shadow md:stats-horizontal">
        <Stat
          title="Total hours"
          desc="Scheduled hours"
          value={data?.total || 0}
        />
        <Stat
          title="Hours worked"
          desc="Hours logged on napa"
          value={data?.total || 0}
        />
        <Stat
          title="Flex"
          desc="Remember to take some time off!"
          value={data?.flex || 0}
          severity="success"
        />
      </div>
      <div className="divider" />
      {!google.isLoading && google.data && (
        <div>{JSON.stringify(google.data)}</div>
      )}
    </div>
  );
};
