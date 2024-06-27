import {PageSignIn} from "./_components/PageSignIn";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import {redirect} from "next/navigation";

const SingIn = async () => {
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (user) return redirect("/")
    return <PageSignIn />
}

export default SingIn