import React, { useState, useEffect, useRef } from "react";
import Subheader from "./Subheader.tsx";
import Header from "./Header.tsx";

const FullHeader = () => {
  const [isSubheaderVisible, setIsSubheaderVisible] = useState(true);
  const [subheaderHeight, setSubheaderHeight] = useState(0);
  const subheaderRef = useRef(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    console.log(lastScrollY);

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsSubheaderVisible(false);
        console.log(window.scrollY);
      } else {
        setIsSubheaderVisible(true);
      }
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (subheaderRef.current) {
      const height = subheaderRef.current.offsetHeight;
      setSubheaderHeight(height);
    }
  }, []);

  return (
    <div className="fixed w-full z-999 top-0">
      <Subheader
        ref={subheaderRef}
        className={isSubheaderVisible ? "" : "opacity-0 -translate-y-full"}
      />
      <Header
        style={{
          marginTop: isSubheaderVisible ? "0" : `-${subheaderHeight}px`,
        }}
      />
    </div>
  );
};

export default FullHeader;
