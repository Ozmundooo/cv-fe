import React from "react";
import SampleTeamPhoto from "@/assets/SampleTeamPhoto.png";
import Image from "next/image";
export default function TeamCard() {
  return (
    <div>
      <Image src={SampleTeamPhoto} alt="Sample Team" />
      <h3 className="font-subtext text-[32px] font-bold leading-[58px] tracking-[-0.04em] text-[#1D1E22]">
        John Doe
      </h3>
      <p className="font-subtext text-[15px] font-normal leading-5 tracking-[-0.04em] text-[#1D1E22]/80">
        Position @ Crescent Village
      </p>
      <p className="mt-4 max-w-[440px] font-subtext text-[15px] font-normal leading-5 tracking-[-0.04em] text-[#1D1E22]">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since 1966.
      </p>
    </div>
  );
}
