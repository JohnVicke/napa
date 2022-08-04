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

interface ProfileProps {}

const Profile = ({}: ProfileProps) => {
  const { addToast } = useToastStore();
  const { data } = trpc.useQuery(["workweek.getSummary"]);
  return (
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Summary</h2>
      <div className="stats stats-vertical md:stats-horizontal shadow pt-2">
        <Stat
          title="Total hours worked"
          desc="Logged on time-keeper"
          value={data?.total || 0}
        />
        <Stat
          title="Flex"
          desc="Remember to take some time off!"
          value={data?.flex || 0}
          severity="success"
        />
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
