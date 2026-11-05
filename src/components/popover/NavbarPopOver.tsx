"use client";

import { authClient } from "@/lib/auth-client";
import { IUserDataType } from "@/types/userData";
import { Avatar, Popover } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoSignOut } from "react-icons/go";

export function NavbarPopOver({
  user,
  onNavigate,
}: {
  user: IUserDataType;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const handleLogOut = async () => {
    await authClient.signOut();
    onNavigate?.();
    router.push("/login");
    router.refresh();
  };
  return (
    <div className="flex items-center">
      <Popover>
        <Popover.Trigger aria-label="User profile">
          <div className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 transition-colors hover:bg-black/[0.04]">
            <Avatar size="sm">
              <Avatar.Image alt={user?.name} src={user?.image || ""} />
              <Avatar.Fallback>{user?.name.slice(0, 1)}</Avatar.Fallback>
            </Avatar>
            <div className="hidden max-w-[9rem] flex-col text-left sm:flex lg:max-w-[11rem]">
              <p className="truncate text-sm font-semibold text-slate-800">
                {user?.name}
              </p>
              <p className="truncate text-xs text-slate-500">{user?.email}</p>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Content className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl">
          <Popover.Dialog className="flex flex-col gap-3">
            <Popover.Heading>
              <div className="flex items-center gap-3">
                <Avatar size="md">
                  <Avatar.Image alt={user?.name} src={user?.image || ""} />
                  <Avatar.Fallback>{user.name.slice(0, 1)}</Avatar.Fallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-slate-800">
                    {user?.name}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {user?.email}
                  </p>
                </div>
              </div>
            </Popover.Heading>
            <div className="flex flex-col gap-2 border-t border-black/[0.06] pt-3">
              <Link
                href="/profile"
                onClick={onNavigate}
                className="inline-flex h-10 w-full items-center justify-center rounded-xl border border-[#0d4d33]/25 bg-white text-sm font-semibold text-[#0d4d33] transition-colors hover:bg-[#0d4d33]/5"
              >
                My Profile
              </Link>
              <button
                type="button"
                onClick={handleLogOut}
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#0d4d33] text-sm font-semibold text-white transition-colors hover:bg-[#b91c1c]"
              >
                Log Out
                <GoSignOut />
              </button>
            </div>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}