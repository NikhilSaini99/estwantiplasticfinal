
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { useDispatch } from "react-redux";
secret: process.env.NEXT_PUBLIC_SECRET
export default NextAuth({


  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",

      
      credentials:{
        email:{
            label:"Email",
            type:'text',
        },
       
        password:{
            label:'Password',
            type:'password'
        }
    },

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const {email_id,password} = credentials;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            email_id: credentials?.email_id,
            password: credentials?.password
          })
        })
        const user = await res.json();

        // console.log(user)
        // console.log(user.result.list.user_type)


        if(user.result.list.user_type===1){
            // console.log('yes user is there ',user)
            
            // call new API get user details by user ID 
              return Promise.resolve('123');
        }
       
        return null;
      }
    })
  ],secret: process.env.NEXT_PUBLIC_API_URL
}
)