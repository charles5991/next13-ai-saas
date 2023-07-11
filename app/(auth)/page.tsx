import {
  RegisterLink, 
  LoginLink
} from "@kinde-oss/kinde-auth-nextjs/server";

const AuthPage = () => {
  return ( 
    <div>
      <LoginLink>Sign in</LoginLink>
      <RegisterLink>Sign up</RegisterLink>
    </div>
   );
}
 
export default AuthPage;
