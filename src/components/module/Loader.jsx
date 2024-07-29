import { Circles } from "react-loader-spinner";


function Loader({ width = 50, height = 20, color ="rgb(0 0 0)" }) {
  return (
    <div>
      <Circles
        width={width}
        height={height}
        color={color}
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
