"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  Person,
  Briefcase,
  Envelope,
  Gear,
  ChartColumn,
  CreditCard,
  ArrowRightFromSquare,
  LayoutHeaderSideContent,
  PersonPencil,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import MobileSidebar from "../Shared/MobileSideberFree";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard/freelancer",
    icon: LayoutHeaderSideContent,
  },
  {
    name: "My Proposals",
    href: "/dashboard/freelancer/proposals",
    icon: Person,
  },
  {
    name: "Active Project",
    href: "/dashboard/freelancer/active-project",
    icon: Briefcase,
  },
  {
    name: "My Earning",
    href: "/dashboard/freelancer/earnings",
    icon: CreditCard,
  },
  {
    name: "Edit Profile",
    href: "/dashboard/freelancer/profile",
    icon: PersonPencil,
  },
];

export default function SidebarFreelancer() {
  const pathname = usePathname();
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  console.log(session);

  return (
    <>
      {/* Desktop */}
      <aside className="hidden min-h-screen lg:flex w-72 border-r bg-white  flex-col">
        <div className="p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/assets/logo.png"
              width={180}
              height={60}
              alt="Giglance Logo"
              className="object-contain"
            />
          </Link>
        </div>

        <nav className="space-y-2 p-4 flex-1">
          {links.map(({ href, name, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition
                ${
                  pathname === href
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              <Icon />
              <span>{name}</span>
            </Link>
          ))}
        </nav>
        <div className="border-t p-4 flex justify-between items-center">
          <button className="flex w-full items-center gap-3 rounded-xl p-3 transition hover:bg-gray-100">
            <img
              src={session?.user.image}
              alt={session?.user.name}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div className="flex-1 text-left">
              <p className="font-semibold text-gray-800">
                {session?.user.name}
              </p>

              <p className="text-sm text-gray-500">Freelancer</p>
            </div>
          </button>
          <button
            className="text-5xl"
            onClick={async () => await authClient.signOut()}
          >
            <ArrowRightFromSquare />
          </button>
        </div>
      </aside>

      <MobileSidebar links={links} />
    </>
  );
}
