"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";
import IconButton from "./IconButton";

const backIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

export default function ToolkitBackLink() {
  const router = useRouter();
  const handleBack = () => router.push("/workspace");

  return (
    <>
      {/* Mobile: icon only */}
      <div className="flex md:hidden">
        <IconButton variant="tonal" size="md" icon={backIcon} onClick={handleBack} ariaLabel="Portfolio toolkit" />
      </div>
      {/* Desktop: labeled button */}
      <div className="hidden md:flex">
        <Button variant="tonal" size="md" icon={backIcon} onClick={handleBack}>
          Portfolio toolkit
        </Button>
      </div>
    </>
  );
}
