import React from "react";

const getViewBox = name => {
  switch (name) {
    case "phone":
      return "0 0 24 24";
    case "message":
      return "0 0 24 24";
    case "face":
      return "0 0 24 16";
    case "settings":
      return "0 0 24 24";
    case "check":
    return "0 0 50 50";
    default:
      return "0 0 32 32";
  }
};

const getPath = (name, props) => {
  switch (name) {
    case "phone":
      return (
        <path
          {...props}
          d="M1.33333 0C0.979711 0 0.640573 0.141749 0.390524 0.394064C0.140476 0.646378 0 0.988591 0 1.34542C0 7.41147 2.38809 13.2291 6.63891 17.5184C10.8897 21.8078 16.6551 24.2175 22.6667 24.2175C23.0203 24.2175 23.3594 24.0758 23.6095 23.8235C23.8595 23.5711 24 23.2289 24 22.8721V18.1631C24 17.8063 23.8595 17.4641 23.6095 17.2118C23.3594 16.9595 23.0203 16.8177 22.6667 16.8177C21.0133 16.8177 19.4 16.5486 17.9067 16.0508C17.44 15.9028 16.92 16.0105 16.5467 16.3872L13.6133 19.3471C9.84 17.4097 6.76 14.2883 4.82667 10.4808L7.76 7.50743C8.13333 7.14417 8.24 6.61945 8.09333 6.14856C7.6 4.64169 7.33333 3.01374 7.33333 1.34542C7.33333 0.988591 7.19286 0.646378 6.94281 0.394064C6.69276 0.141749 6.35362 0 6 0H1.33333Z"
        />
      );
    case "message":
      return (
        <path
          {...props}
          d="M18 10.8979H15.6V8.47613H18V10.8979ZM13.2 10.8979H10.8V8.47613H13.2V10.8979ZM8.4 10.8979H6V8.47613H8.4V10.8979ZM21.6 0H2.4C1.76348 0 1.15303 0.255148 0.702944 0.709315C0.252856 1.16348 0 1.77946 0 2.42175V24.2175L4.8 19.374H21.6C22.2365 19.374 22.847 19.1189 23.2971 18.6647C23.7471 18.2105 24 17.5945 24 16.9523V2.42175C24 1.07768 22.92 0 21.6 0Z"
        />
      );
    case "face":
      return (
        <path
          {...props}
          d="M16.3636 9.22572C16.0473 9.22572 15.6873 9.22572 15.3055 9.28338C16.5709 10.2521 17.4545 11.5322 17.4545 13.262V16.145H24V13.262C24 10.575 18.9055 9.22572 16.3636 9.22572ZM7.63636 9.22572C5.09455 9.22572 0 10.575 0 13.262V16.145H15.2727V13.262C15.2727 10.575 10.1782 9.22572 7.63636 9.22572ZM7.63636 6.91929C8.50435 6.91929 9.33678 6.55479 9.95053 5.90598C10.5643 5.25717 10.9091 4.3772 10.9091 3.45965C10.9091 2.54209 10.5643 1.66212 9.95053 1.01331C9.33678 0.364497 8.50435 0 7.63636 0C6.76838 0 5.93595 0.364497 5.3222 1.01331C4.70844 1.66212 4.36364 2.54209 4.36364 3.45965C4.36364 4.3772 4.70844 5.25717 5.3222 5.90598C5.93595 6.55479 6.76838 6.91929 7.63636 6.91929ZM16.3636 6.91929C17.2316 6.91929 18.064 6.55479 18.6778 5.90598C19.2916 5.25717 19.6364 4.3772 19.6364 3.45965C19.6364 2.54209 19.2916 1.66212 18.6778 1.01331C18.064 0.364497 17.2316 0 16.3636 0C15.4957 0 14.6632 0.364497 14.0495 1.01331C13.4357 1.66212 13.0909 2.54209 13.0909 3.45965C13.0909 4.3772 13.4357 5.25717 14.0495 5.90598C14.6632 6.55479 15.4957 6.91929 16.3636 6.91929Z"
        />
      );
    case "settings":
      return (
        <path
          {...props}
          d="M12 9.33333C10.5333 9.33333 9.33333 10.5333 9.33333 12C9.33333 13.4667 10.5333 14.6667 12 14.6667C13.4667 14.6667 14.6667 13.4667 14.6667 12C14.6667 10.5333 13.4667 9.33333 12 9.33333ZM21.3333 0H2.66667C1.18667 0 0 1.2 0 2.66667V21.3333C0 22.8 1.18667 24 2.66667 24H21.3333C22.8133 24 24 22.8 24 21.3333V2.66667C24 1.2 22.8133 0 21.3333 0ZM19 12C19 12.3067 18.9733 12.6133 18.9333 12.9067L20.9067 14.4533C21.08 14.6 21.1333 14.8533 21.0133 15.0533L19.1467 18.28C19.0267 18.48 18.7867 18.56 18.5733 18.48L16.2533 17.5467C15.7733 17.92 15.24 18.2267 14.68 18.4667L14.3333 20.9333C14.2933 21.16 14.0933 21.3333 13.8667 21.3333H10.1333C9.90667 21.3333 9.70667 21.16 9.66667 20.9467L9.32 18.48C8.74667 18.24 8.22667 17.9333 7.74667 17.56L5.42667 18.4933C5.21333 18.5733 4.97333 18.4933 4.85333 18.2933L2.98667 15.0667C2.86667 14.8667 2.92 14.6133 3.09333 14.4667L5.06667 12.92C5.02667 12.6133 5 12.3067 5 12C5 11.6933 5.02667 11.3867 5.06667 11.0933L3.09333 9.54667C2.92 9.4 2.86667 9.14667 2.98667 8.94667L4.85333 5.72C4.97333 5.52 5.21333 5.44 5.42667 5.52L7.74667 6.45333C8.22667 6.08 8.76 5.77333 9.32 5.53333L9.66667 3.06667C9.70667 2.84 9.90667 2.66667 10.1333 2.66667H13.8667C14.0933 2.66667 14.2933 2.84 14.3333 3.05333L14.68 5.52C15.2533 5.76 15.7733 6.06667 16.2533 6.44L18.5733 5.50667C18.7867 5.42667 19.0267 5.50667 19.1467 5.70667L21.0133 8.93333C21.1333 9.13333 21.08 9.38667 20.9067 9.53333L18.9333 11.08C18.9733 11.3867 19 11.6933 19 12Z"
        />
      );
      case "check":
      return (
        <path
          {...props}
          d="M45.8333 23.0834V25C45.8307 29.4926 44.376 33.8639 41.6861 37.4622C38.9961 41.0604 35.2151 43.6927 30.907 44.9665C26.5988 46.2403 21.9943 46.0873 17.7801 44.5304C13.566 42.9735 9.96799 40.0961 7.52279 36.3273C5.0776 32.5584 3.91619 28.1002 4.21179 23.6174C4.50738 19.1346 6.24414 14.8674 9.16304 11.4523C12.0819 8.03717 16.0266 5.65709 20.4087 4.66701C24.7908 3.67694 29.3755 4.12991 33.4791 5.95838"
          d="M45.8333 8.33325L25 29.1874L18.75 22.9374" stroke="#2BE28A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        />
      );
    default:
      return <path />;
  }
};

const SVGIcon = ({
  name = "",
  style = {},
  fill = "#fff",
  viewBox = "",
  width = "100%",
  className = "",
  height = "100%"
}) => (
  <svg
    width={width}
    style={style}
    height={height}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox || getViewBox(name)}
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    {getPath(name, { fill })}
  </svg>
);

export default SVGIcon;
