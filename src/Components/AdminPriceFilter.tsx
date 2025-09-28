import {Range} from "react-range";

const AdminPriceFilter = ({ priceRange, setPriceRange }) => {
  return(
     <div className="px-2">
      <Range
        step={1}
        min={0}
        max={1000}
        values={priceRange}
        onChange={(values) => setPriceRange(values)}
        renderTrack={({ props, children }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              className="h-2 w-full rounded-full bg-orange-200 relative"
            >
              <div
                className="absolute h-full rounded-full bg-orange-500"
                style={{
                  left: `${(priceRange[0] / 1000) * 100}%`,
                  right: `${100 - (priceRange[1] / 1000) * 100}%`,
                }}
              />
              {children}
            </div>
          );
        }}
        renderThumb={({ props }) => {
          const { key, ...restProps } = props;
          return (
            <div
              key={key}
              {...restProps}
              className="w-6 h-6 rounded-full bg-orange-500 border-2 border-white shadow-md outline-none"
              style={{
                ...restProps.style,
                height: "24px",
                width: "24px",
                cursor: "grab",
              }}
            />
          );
        }}
      />
    </div>
  )
}

export default AdminPriceFilter;