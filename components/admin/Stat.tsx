import React from "react";

const Stat = ({ title, total }: { title: string; total: number }) => {
  return (
    <div className="stat">
      <div className="stat-info">
        <p className="stat-label">{title}</p>
      </div>
      <p className="stat-count">{total}</p>
    </div>
  );
};

export default Stat;
