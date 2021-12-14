import { useEffect, useState } from 'react'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import Link from 'next/link'
import toast from 'react-hot-toast'


export default function SignIn({ user }) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  async function signIn(e) {
    e.preventDefault()

    const { user, error } = await supabase.auth.signIn({
      email
    })

    console.log(user)
    if (error) {
      toast.error({ error })
    } else {
      setSubmitted(true)
    }
  }

  if (submitted) {
    return (
      <div className="default-bg pt-48">
        <div className="default-card">
          <h1 className="font-bold text-2xl mb-3"> success 🌟</h1>
          <p className="text-sm text-gray-500"> please check your email to sign in! </p>
          <p className="text-xs italic text-gray-500 mt-3"> it might take a few seconds! </p> 
          
        </div>
      </div>
    )
  }

  return (
    <div className="default-bg">
      <div className="default-card">
        
        <h1 className="font-bold text-2xl mb-3"> sign in </h1>
        <p className="text-sm text-gray-500 mb-5"> enter your email and we&apos;ll send you a magic link to log in / sign up! </p>
        <form onSubmit={signIn}>
          <input onChange={e => setEmail(e.target.value)}
          type="email" className="default-input" placeholder="Your email"/>
          <p className="text-xs italic text-gray-500 mt-3"> p.s. we&apos;ll never send you marketing emails or use this address for anything other than for logging in. </p>
          <button type="submit" className="button mt-5">sign in</button>
        </form>
      </div>
    </div>
      
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (user) {
    return { props: {}, redirect: { destination: '/settings' } }
  }

  return { props: {} }
}