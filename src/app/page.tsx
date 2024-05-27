"use client";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import React from "react";

const Page: NextPage = () => {
	const router = useRouter();

	React.useEffect(() => {
		router.push("/Main");
	});

	return null;
};

export default Page;
