import React, { useEffect, useRef, useState } from "react";
import Subheader from "../Subheader.tsx";
import Header from "./Header.tsx";

const FullHeader = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [isSubheaderVisible, setIsSubheaderVisible] = useState(true);
  const [subheaderHeight, setSubheaderHeight] = useState(0);
  const subheaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsSubheaderVisible(false);
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
      setSubheaderHeight(subheaderRef.current.offsetHeight);
    }
  }, []);

  return (
    <div ref={ref} className="fixed w-full z-50 top-0 bg-white">
      <Subheader
        ref={subheaderRef}
        className={`transition-all duration-300 ${
          isSubheaderVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full"
        }`}
      />
      <Header
        style={{
          marginTop: isSubheaderVisible ? "0" : `-${subheaderHeight}px`,
        }}
      />
    </div>
  );
});

export default FullHeader;
