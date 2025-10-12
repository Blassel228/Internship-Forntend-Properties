import React, {useEffect, useRef, useState} from "react";
import Subheader from "./Subheader.tsx";
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
      <Header
        style={{
          marginTop: isSubheaderVisible ? "0" : `-${0}px`,
        }}
      />
    </div>
  );
});

export default FullHeader;
