import React from "react";

const Sort = () => {
  return (
    <div>
      <label>Sort By: </label>
      <select>
        <option>---</option>
        <option>Admin</option>
        <option>Date</option>
        <option>Time</option>
        <option>CurrentOS</option>
        <option>Status</option>
        <option>AppTeamStatus</option>
        <option>Server Name</option>
        <option>Company</option>
      </select>
    </div>
  );
};

export default Sort;
