import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkIcon, LogOut, LogOutIcon } from "lucide-react";
import { UrlState } from "@/Context";
import { logout } from "@/db/apiAuth";
import { BarLoader, CircleLoader } from "react-spinners";
import useFetch from "@/Hooks/userFetch";
const Header = () => {
  const navigate = useNavigate();
  const { user, fetchUser } = UrlState();
  const { loading, fn: fnlogout } = useFetch(logout);

  return (
    <>
      <nav className="p-4 flex justify-between items-center">
        <Link to={"/"}>
          <img src="/logo.png" className="h-16" alt="trimmerlogo" />
        </Link>
        <div>
          {!user ? (
            <Button onClick={() => navigate("/auth")}>Login</Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer rounded-full overflow-hidden">
                <Avatar>
                  <AvatarImage
                    src={user?.user_metadata?.profile_pic}
                    className="object-contain"
                  />
                  <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {user?.user_metadata?.name}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Link to="/dashboard" className="no-underline">
                  <DropdownMenuItem>
                    <LinkIcon className="w-4 h-4 mr-2" />
                    My Links
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="w-4 h-4 mr-2  text-red-500" />
                  <span
                    onClick={() => {
                      fnlogout().then(() => {
                        fetchUser();
                        navigate("/");
                      });
                    }}
                  >
                    Logout
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {loading && (
          <CircleLoader className="mb-4" width={"10%"} color="#36d7b7" />
        )}
      </nav>
    </>
  );
};

export default Header;
