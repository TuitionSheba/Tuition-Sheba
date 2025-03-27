const CardSkeleton = () => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl p-6">
      {/* Skeleton for the title */}
      <div className="skeleton h-8 w-full mb-4"></div>

      {/* Skeleton for the first row */}
      <div className="flex items-center mb-2">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-6 w-1/3 ml-auto"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-6 w-1/3 ml-auto"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-6 w-1/3 ml-auto"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-6 w-1/3 ml-auto"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-6 w-1/3 ml-auto"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-6 w-1/3 ml-auto"></div>
      </div>
      <div className="flex items-center mb-2">
        <div className="skeleton h-6 w-1/3"></div>
        <div className="skeleton h-6 w-1/3 ml-auto"></div>
      </div>

      {/* Skeleton for the location title */}
      {/* <div className="skeleton h-6 w-1/3 mb-2"></div> */}

      {/* Skeleton for the location details */}
      <div className="skeleton h-6 w-full mb-2"></div>
      <div className="skeleton h-6 w-full mb-4"></div>

      {/* Skeleton for the button */}
      <div className="skeleton h-12 w-full"></div>
    </div>
  );
};

export default CardSkeleton;
