import { useState, useEffect } from 'react';
import { supabase } from '../client'
import { useRouter } from 'next/router'


export default function Profile({ user }) {
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])
  
  async function fetchProfile() {
    try {
      let { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id, username')
        .eq('id', user.id)
        .single()
      
      if (profileError) {
        throw profileError
      } 
      setProfile(profileData)
    } catch (error){
      console.log(error)
    }
  }

  async function update() {
    const { user, error } = await supabase.auth.update({ 
      data: {
        city: "New York"
      } 
    })
    console.log('user:', user);
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  return (
    <div className="default-bg">
      <div className="default-card">
        <h2 className="default-header"> profile </h2>
        <p className="text-sm text-gray-500 mb-5"> your current username: {profile&&profile.username} </p>
        {/*<h5 className="text-lg mb-2"> update username </h5>
        <input type="text" className="default-input mb-5" placeholder="new username" />*/}
        <button onClick={signOut} className="button-secondary">sign out</button>
      </div>
    </div>
  )
}

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req)

  if (!user) {
    return { props: {}, redirect: { destination: '/sign-in' } }
  }

  return { props: { user } }
}