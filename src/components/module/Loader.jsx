
import { ThreeDots } from "react-loader-spinner";



function Loader({ width=50, height=20, color }) {
  return (
    <div>
      <ThreeDots
        visible={true}
        width={width}
        height={height}
        color="rgb(0, 0, 0)"
        ariaLabel="loading"
      />
    </div>
  );
}

export default Loader;
