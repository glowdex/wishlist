import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../client'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        router.push('/profile')
      }
      if (event === 'SIGNED_OUT') {
        setAuthenticatedState('not-authenticated')
      }
    })
    checkUser()
    return () => {
      authListener.unsubscribe()
    }
  }, [])
  async function checkUser() {
    console.log("fired")
    const checkedUser = await supabase.auth.user()
    if (checkedUser) {
      setUser(checkedUser)
      setAuthenticatedState('authenticated')
    }
  }
  async function handleAuthChange(event, session) {
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    })
  }

  return (
    <div className="h-screen bg-stone-50 overflow-scroll">
      <nav className="flex justify-between items-center px-16 h-12 fixed w-full bg-white">
        <Link href="/">
          <button className="font-bold"> home </button>
        </Link>
        {(authenticatedState === "authenticated") 
        ? (<Link href="/edit-list">
            <button className="button-secondary font-bold"> ✨ my wishlist ✨ </button>
          </Link>)
        : null}

        {(authenticatedState === "authenticated") 
        ? (<Link href="/profile">
            <button className="font-bold"> profile </button>
          </Link>)
        : null}
      </nav>
      <div className="mt-12">
        <Component {...pageProps} />
      </div>
    </div>
  )
}


export default MyApp