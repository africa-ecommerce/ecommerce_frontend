"use client"

import useSWR from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || "Failed to fetch product");
  }
  const { data } = await res.json();
  return data;
};

export const getProduct = async (id: string) => {
  const {
    data: fetchedData,
  } = useSWR(`/api/products/${id}`, fetcher);

  return fetchedData;
};
