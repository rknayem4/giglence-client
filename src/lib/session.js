import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "./auth";

export const getUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session.user || null;
};

export const RequireRole = async (role)=>{
  const user = await getUser()
  if(user.role !== role){
    redirect('/unauthorized')
  }
}

