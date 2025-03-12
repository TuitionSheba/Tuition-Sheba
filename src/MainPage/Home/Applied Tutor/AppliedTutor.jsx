const AppliedTutor = () => {
  return (
    <div className="bg-[#f3f3f3] w-full h-[200px] text-[#00ADB5] rounded flex flex-col items-center justify-center gap-8 mt-20">
      <h1 className="lg:p-0 px-5">
        নিচের বাটনে ক্লিক করে আপনার আবেদনকৃত টিউশনগুলোর স্ট্যাটাস দেখুন
      </h1>
      <button className="bg-[#00ADB5] px-4 py-3 rounded-[34px] hover:bg-opacity-80 text-white transition-all">
        Check your applied status
      </button>
    </div>
  );
};

export default AppliedTutor;
