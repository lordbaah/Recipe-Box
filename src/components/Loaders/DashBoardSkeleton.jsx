const DashBoardSkeleton = () => {
  return (
    <div role="status" className="w-full animate-pulse">
      <h3 className="h-12 bg-gray-300 rounded-full  w-full mb-4" />
      <p className="h-4 bg-gray-300 rounded-full w-[90%] mb-2.5" />
      <p className="h-4 bg-gray-300 rounded-full w-[90%] mb-2.5" />
      <p className="h-4 bg-gray-300 rounded-full w-[90%] mb-2.5" />
    </div>
  );
};

export default DashBoardSkeleton;
