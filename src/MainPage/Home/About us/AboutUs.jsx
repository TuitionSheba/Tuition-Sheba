const AboutUs = () => {
  return (
    <div id="target" className="max-w-screen-xl mx-auto mt-12">
      <div className="flex md:flex-row flex-col xl:justify-around justify-center xl:gap-0 gap-12 py-[75px] items-center">
        <div className="flex items-center flex-col gap-6">
          <img
            className="w-[150px] h-[150px] rounded-full border-4 border-white"
            src="https://i.ibb.co.com/7N2bVsNv/profilepic.png"
            alt=""
          />
          <h1 className="text-white text-3xl font-bold">Md Mahedi Hasan</h1>
          <div className="flex items-center gap-2">
            <a
              href="https://www.facebook.com/profile.php?id=100093108041447"
              target="_blank"
            >
              <img
                className="w-[50px] h-[50px] rounded-full cursor-pointer"
                src="https://i.ibb.co.com/TxbnLZZQ/fb-logo.png"
                alt=""
              />
            </a>
            <a target="_blank" href="https://wa.me/01869442145">
              <img
                className="w-[50px] h-[50px] rounded-full cursor-pointer"
                src="https://i.ibb.co.com/pvFDWmLt/wp-logo.jpg"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="text-white text-lg space-y-8 md:px-0 px-5 text-center">
          <div>
            <h1 className="text-3xl font-bold">About Tuition Seba</h1>
            <p className="font-medium xl:w-[636px] md:w-[356px] mt-3">
              Tuition Seba একটি সুপ্রতিষ্ঠিত এবং চট্টগ্রাম শহরের অন্যতম একটি
              টিউশন মিডিয়া। আমাদের রয়েছে নিজস্ব অফিস ও দীর্ঘ কয়েক বছরের টিউশন ও
              গৃহশিক্ষক ও শিক্ষিকা দেয়ার অভিজ্ঞতা। আস্থা ও বিশ্বস্ততায় আমরা
              একধাপ এগিয়ে।
            </p>
          </div>
          <div className="flex justify-center gap-8">
            <div>
              <h1 className="md:text-3xl text-2xl font-bold">Our Location :</h1>
              <p className="">
                25 number shop Sholoshohor <br /> Super Market, 2 no gate
              </p>
            </div>
            <div>
              <h1 className="md:text-3xl text-2xl font-bold">Contact:</h1>
              <p className="">01540376020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
