'use client'

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signIn as signInByNextAuth } from "next-auth/react";

export const PageSignIn = () => {

  const signIn = async (formData: FormData) => {
    console.log(`email: ${formData.get('email')}, password: ${formData.get('password')}`)
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
      const idToken = await userCredential.user.getIdToken();
      console.log(idToken)
      await signInByNextAuth("credentials", {
        idToken,
        callbackUrl: "/",
      });
    } catch (e) {
      console.error(e);
    }
  }
    return (
        <main className='bg-white w-full min-h-screen h-full flex justify-center items-center text-black'>
          <div className='h-[500px] w-[500px] flex flex-col gap-8'>
            <div className='flex justify-center'>
              <h1 className='font-bold'>ログイン</h1>
            </div>

            <form className='flex flex-col gap-4' action={(formData) => signIn(formData)}>
              <div className='flex flex-col'>
                <label htmlFor="email">メールアドレス</label>
                <input className='border rounded h-10 py-2 px-2' name='email' id='email' type="text"
                       placeholder="Email"/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password">パスワード</label>
                <input className='border rounded h-10 py-2 px-2' name='password' type="password"
                       placeholder="Password" id='password'/>
              </div>
              <div className='flex justify-center items-center'>
                <button className='bg-blue-500 h-10 w-1/4 rounded text-white hover:bg-blue-400' type="submit">Sign In
                </button>
              </div>
            </form>
          </div>


        </main>
    )
}