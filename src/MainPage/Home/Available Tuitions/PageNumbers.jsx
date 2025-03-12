const PageNumbers = () => {
  return (
    <div>
      <h1 className="md:text-2xl text-lg font-medium text-center">
        Page: <span className="text-[#5FC7F9]">x</span> /{" "}
        <span className="text-[#5FC7F9]">x</span>, found{" "}
        <span className="text-[#198754]">x</span> tuitions out of{" "}
        <span className="text-[#565A6C]">x</span>
      </h1>
    </div>
  );
};

export default PageNumbers;
