import React from "react";

export default function TeamCard({ name, role, bio, imageUrl }) {
  return (
    <div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name ?? ""}
          loading="lazy"
          className="w-full"
        />
      )}
      <h3 className="font-subtext text-[20px] font-bold leading-7 tracking-[-0.04em] text-[#1D1E22] lg:text-[32px] lg:leading-[58px]">
        {name}
      </h3>
      {role && (
        <p className="font-subtext text-[15px] font-normal leading-5 tracking-[-0.04em] text-[#1D1E22]/80">
          {role}
        </p>
      )}
      {bio && (
        <p className="mt-4 max-w-[440px] font-subtext text-[15px] font-normal leading-5 tracking-[-0.04em] text-[#1D1E22]">
          {bio}
        </p>
      )}
    </div>
  );
}
