import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../client'
import { useRouter } from 'next/router'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const [authenticatedState, setAuthenticatedState] = useState('not-authenticated')
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      handleAuthChange(event, session)
      if (event === 'SIGNED_IN') {
        setAuthenticatedState('authenticated')
        setLoading(true)
        checkUser()
        setLoading(false)
        router.push('/settings')
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
    <div className="h-screen overflow-scroll bg-gradient-to-r from-rose-100 to-indigo-100" style={{backgroundColor:user?.user_metadata.color??null}}>
      { loading 
        ? <p className="default-bg">Loading...</p>
      : <div> {(authenticatedState === "authenticated" && user)
      ? <nav className="flex flex-wrap mt-4 justify-between items-center px-16 py-3 fixed w-full">
        <Link href="/edit-list">
          <button className="font-bold w-full sm:w-36"> edit list </button>
        </Link>
        <Link href={`/list/${user?.user_metadata.username}`}>
          <button className="button-secondary font-bold w-full sm:w-36"> ✨ my list ✨ </button>
        </Link>
        <Link href="/settings">
          <button className="font-bold w-full sm:w-36"> settings </button>
        </Link>
        {user?.user_metadata.username 
        ? <p className="text-xs mt-3 w-full text-center sm:"> your public list url is <br/> <b>thegetlist.co/list/{user.user_metadata.username} </b></p> 
        : <p className="text-xs"> set your username to get a list url! </p> }
      </nav>
      : null }
      <Toaster 
              toastOptions={{
                success: {
                  style: {
                    background: '#f5fcde',
                  },
                },
                error: {
                  style: {
                    background: '#fcebea',
                  },
                },
                info: {
                  style: {
                    background: '#eff8fc',
                  }
                }
              }}
            />
      <div>
         <Component {...pageProps} /> 
      </div> </div> }
    </div>
  )
}


export default MyApp