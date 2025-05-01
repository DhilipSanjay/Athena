"use client";

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Session, signOut } from "@/lib/client";
import { toast } from "sonner";
import { APP_NAME } from "@/constants/common";
import DropdownMenuHolder from "@/components/holders/DropdownMenuHolder";

interface ICUserMenuProps {
  session: Session;
}

const CUserMenu: FC<ICUserMenuProps> = ({ session }) => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const router = useRouter();

  const signOutFromAthena = async () => {
    await signOut({
      fetchOptions: {
        onRequest: () => {
          // Show logging out in button
          setIsSigningOut(true);
        },
        onSuccess: () => {
          toast.success("You have been logged out successfully!");
          router.refresh();
          setIsSigningOut(false);
        },
        onError: (error) => {
          console.error("Error during logout:", error);
          toast.error("An error occurred while logging out. Please try again.");
          setIsSigningOut(false);
        },
      },
    });
  };

  return (
    <>
      {isSigningOut && (
        <div className="border border-foreground/50 border-dashed text-sm h-8 rounded-md p-2 flex items-center justify-center">
          Logging out...
        </div>
      )}
      <DropdownMenuHolder
        trigger={
          <Avatar className="size-8 cursor-pointer">
            <AvatarImage src={session.user?.image ?? undefined} />
            <AvatarFallback>
              {session.user?.name.substring(0, 1) ?? ":)"}
            </AvatarFallback>
          </Avatar>
        }
      >
        <DropdownMenuContent
          className="min-w-56 rounded-lg"
          align="end"
          sideOffset={8}
        >
          <DropdownMenuLabel>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {session.user?.name ?? `${APP_NAME} User`}
              </span>
              {session.user?.email && (
                <span className="truncate text-xs text-muted-foreground">
                  {session.user.email}
                </span>
              )}
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {/* <DropdownMenuItem>
              Feedback
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={signOutFromAthena}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuHolder>
    </>
  );
};

export default CUserMenu;
