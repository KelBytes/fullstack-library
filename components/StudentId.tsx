"use client";
import config from "@/lib/config";
import { IKImage } from "imagekitio-next";

const StudentId = ({ source }: { source: string }) => {
  return (
    <IKImage
      urlEndpoint={config.env.imagekit.urlEndpoint}
      path={source}
      width={500}
      height={300}
      alt="Student ID"
    />
  );
};

export default StudentId;
