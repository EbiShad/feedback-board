"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

function Header() {
  const { status } = useSession();

  // const session = useSession();
  // console.log(session)

  const signoutHandler = async () => {
    await signOut();
  }

  return (
    <header>
      <div className="flex justify-between items-center py-4 px-4 border-b">
        <Link
          href={"/"}
          className="text-[32px] font-bold from-[#c438bf] bg-clip-text text-transparent to-[#b249f8] bg-gradient-to-b"
        >
          Feedback Board
        </Link>
        <nav className="flex gap-2 *:bg-purple-300 *:px-4 *:py-2 *:rounded">
          {status === "authenticated" ? (
            <Link
              href={"/"}
              className="hover:bg-purple-400 transition ease-in-out delay-75"
              onClick={signoutHandler}
            >
              Logout
            </Link>
          ) : (
            <Link
              href={"/signin"}
              className="hover:bg-purple-400 transition ease-in-out delay-75"
            >
              Login
            </Link>
          )}
          {status === "unauthenticated" && (
            <Link
              href={"/signup"}
              className="hover:bg-purple-400 transition ease-in-out delay-75"
            >
              signup
            </Link>
          )}

          <Link
            href={status==="authenticated" ? "/new-listing":"/signin"}
            className="hover:bg-purple-400 transition ease-in-out delay-75"
          >
            Post a job
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
