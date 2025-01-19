"use client";

import { usePathname } from "next/navigation";
import {
  OrganizationSwitcher,
  SignedIn,
  useOrganization,
  useUser,
} from "@clerk/nextjs";

const OrgSwitcher = () => {
  const { isLoaded } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  if (!isLoaded || !isUserLoaded) {
    return null;
  }

  return (
    <div className="flex justify-end mt-2">
      <SignedIn>
        <OrganizationSwitcher
          hidePersonal
          createOrganizationMode={
            pathname === "/onboarding" ? "navigation" : "modal"
          }
          afterCreateOrganizationUrl="/organization/:slug"
          afterSelectOrganizationUrl="/organization/:slug"
          createOrganizationUrl="/onboarding"
          appearance={{
            elements: {
              organizationSwitcherTrigger:
                "border border-violet-500 rounded-md px-5 py-2 text-violet-500 bg-white hover:bg-violet-100 transition duration-200",
              organizationSwitcherTriggerIcon: "text-violet-500",
              organizationSwitcher: "shadow-lg border border-gray-200 rounded-md bg-white",
              organizationSwitcherListItem:
                "px-4 py-2 hover:bg-violet-100 hover:text-violet-700 cursor-pointer transition duration-200",
            },
          }}
        />
      </SignedIn>
    </div>
  );
};

export default OrgSwitcher;
