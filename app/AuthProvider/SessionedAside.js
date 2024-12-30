import React from "react";
import SideNav from "@Components/SideNav";

const SessionedAside = ({ height, role }) => {
  const roleRights = ["DEVELOPER", "OWNER"];
  const rights = roleRights.includes(role);
  return (
    <div
      className="w-max border-r px-4 py-2 bg-white z-[99]"
      style={{ maxHeight: height, overflowY: "auto" }}
    >
      <SideNav rights={rights} />
    </div>
  );
};

export default SessionedAside;
