"use client";

import React from "react";
import PortableText from "@/components/PortableText";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TeamCard({ name, role, bio, imageUrl }) {
  const hasBio = Array.isArray(bio) && bio.length > 0;

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
      {hasBio && (
        <Dialog>
          <DialogTrigger className="mt-4 font-subtext text-[15px] font-medium tracking-[-0.04em] text-[#1D1E22] underline underline-offset-4 hover:no-underline">
            Read more
          </DialogTrigger>
          <DialogContent className="grid max-h-[85vh] grid-cols-1 gap-4 overflow-y-auto sm:max-w-2xl sm:grid-cols-[minmax(0,160px)_1fr] sm:items-start sm:gap-6 lg:gap-12">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name ?? ""}
                loading="lazy"
                className="mx-auto aspect-[3/4] w-full max-w-[180px] lg:w-[300px] shrink-0 rounded-md object-cover sm:mx-0"
              />
            )}
            <div className="min-w-0">
              <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                {role && <DialogDescription>{role}</DialogDescription>}
              </DialogHeader>
              <div className="mt-4">
                <PortableText blocks={bio} />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
