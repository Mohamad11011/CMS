
'use server'
import { signIn, signOut } from "@/auth";

export async function doSocialLogin(formData: { get: (arg0: string) => any; }) {
    const action = formData.get('action');
    await signIn(action, { redirectTo: "/home" });
}

export async function doLogout() {
  console.log('logout')
  await signOut({ redirectTo: "/auth/signin" });
}

export async function doCredentialLogin(formData: { get: (arg0: string) => any; }) {
  console.log("formData", formData);

  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    return response;
  } catch (err) {
    throw err;
  }
}