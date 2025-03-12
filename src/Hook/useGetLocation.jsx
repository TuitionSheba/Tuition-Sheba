import { useEffect, useState } from "react";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const useGetLocation = (districtId = 0, filteredDistrictId = 0) => {
  const axiosSecure = useAxiosPublic();

  const [filteredDistrict, setFilteredDistrict] = useState([]);
  const [filteredUpazilla, setFilteredUpazilla] = useState([]);

  const { data: districtData = [] } = useQuery({
    queryKey: ["district"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://bdapi.vercel.app/api/v.1/district`
      );
      return res.data.data;
    },
  });

  const { data: upazillaData = [], refetch } = useQuery({
    queryKey: [districtId, "upazilla"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://bdapi.vercel.app/api/v.1/upazilla/${districtId}`
      );
      return res.data.data;
    },
  });

  useEffect(() => {
    const newFilteredDistrict = districtData.filter((x) => x.id === districtId);
    const newFilteredUpazilla = upazillaData.filter(
      (x) => x.id === filteredDistrictId
    );

    if (
      JSON.stringify(newFilteredDistrict) !== JSON.stringify(filteredDistrict)
    ) {
      setFilteredDistrict(newFilteredDistrict);
    }

    if (
      JSON.stringify(newFilteredUpazilla) !== JSON.stringify(filteredUpazilla)
    ) {
      setFilteredUpazilla(newFilteredUpazilla);
    }
  }, [
    districtData,
    upazillaData,
    districtId,
    filteredDistrictId,
    filteredDistrict,
    filteredUpazilla,
  ]);

  return [
    districtData,
    upazillaData,
    refetch,
    filteredDistrict,
    filteredUpazilla,
  ];
};

export default useGetLocation;
