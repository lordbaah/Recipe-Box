import { CiImageOn } from "react-icons/ci";

const CardSkeleton = () => {
  return (
    <div role="status" className=" border border-gray-300 rounded-lg p-4">
      <div className="animate-pulse w-full bg-gray-300 h-48 rounded-lg mb-5 flex justify-center items-center">
        <CiImageOn className="w-8 h-8 stroke-gray-400" />
      </div>
      <div className=" w-full flex justify-between items-start animate-pulse">
        <div className="block">
          <h3 className="h-3 bg-gray-300 rounded-full  w-48 mb-4" />
          <p className="h-2 bg-gray-300 rounded-full w-32 mb-2.5" />
        </div>
        <span className="h-2 bg-gray-300 rounded-full w-16 " />
      </div>
    </div>
  );
};

export default CardSkeleton;
