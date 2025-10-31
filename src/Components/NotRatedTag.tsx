import React from "react";
import clsx from "clsx";

const NotRatedTag = ({ color = "gray" }) => {
  const styles = clsx(
    "px-2 py-0.5 rounded-full text-xs font-medium italic select-none",
    {
      "bg-gray-100 text-gray-600": color === "gray",
      "bg-orange-100 text-orange-700": color === "orange",
      "bg-red-100 text-red-700": color === "red",
    }
  );

  return <span className={styles}>Not rated yet</span>;
};

export default NotRatedTag;
