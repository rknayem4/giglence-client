'use server'
import { headers } from "next/headers";
import { auth } from "../auth";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getSummaryOverviewAdmin = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${baseUrl}/api/admin/dashboard-summary`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  console.log(res.status, res.statusText)
  if (!res.ok) throw new Error("Failed to fetch task details");
  return await res.json();
};

export const getPaymentsForAdmin = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${baseUrl}/api/admin/payments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
};
