"use client";

import { authClient } from "@/lib/auth-client";
import { IUserDataType } from "@/types/userData";
import {Avatar, Button, Popover} from "@heroui/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import {useState} from "react";
import { GoSignOut } from "react-icons/go";

export function NavbarPopOver({user}:{user:IUserDataType}) {
    const handleLogOut = async()=>{
        await authClient.signOut()
        redirect("/login")
    }
  return (
    <div className="flex items-center gap-6">
      <Popover>
        <Popover.Trigger aria-label="User profile">
          <div className="flex items-center gap-2">
            <Avatar size="sm">
              <Avatar.Image
                alt={user?.name}
                src={user?.image || ""}
              />
              <Avatar.Fallback>{user?.name.slice(0,1)}</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm font-medium">{user?.name}</p>
              <p className="text-xs text-neutral-500">{user?.email}</p>
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Content className="w-[320px]">
          <Popover.Dialog className="flex flex-col gap-3">
            <Popover.Heading>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar size="md">
                    <Avatar.Image
                      alt={user?.name}
                      src={user?.image || ""}
                    />
                    <Avatar.Fallback>{user.name.slice(0,1)}</Avatar.Fallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-sm text-neutral-500">{user?.email}</p>
                  </div>
                </div>
              </div>
            </Popover.Heading>
            <Link href="/profile">
            <Button variant="outline">
                My Profile
            </Button>
            </Link>
            <Button variant="danger-soft" onClick={handleLogOut}>
                Log Out <GoSignOut />
            </Button>
          </Popover.Dialog>
        </Popover.Content>
      </Popover>
    </div>
  );
}