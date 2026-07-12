import { redirect } from "next/navigation";
import { getCurrentUserAction } from "@/app/actions/auth";
import { Index } from "@/components/account/Index";

export default async function AccountPage() {
	const user = await getCurrentUserAction(true);

	if (!user) {
		redirect("/login");
	}

	return <Index initialUser={user} />;
}