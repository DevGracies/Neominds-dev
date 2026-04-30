import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut } from "lucide-react";

const Logout = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const logout = async () => {
    try {
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/logout`,
        {
          method: "POST",
        },
      );
      const res = await data.json();
      console.log("Response", res)

        if(!res.success){
          throw new Error(res.message || "Logout Failed");
        }
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center gap-4 w-[200px] ml-6 px-4 py-2 text-white bg-neutral-800 rounded-md hover:bg-neutral-900 cursor-pointer"
      onClick={logout}
    >
        <LogOut />
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Loader2 className="animate-spin size-10" />
          <span>Logging out...</span>
        </div>
      ) : (
        "Logout"
      )}
    </div>
  );
};

export default Logout;