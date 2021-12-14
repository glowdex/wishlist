import { useState, useEffect } from 'react';
import { supabase } from '../client'
import { useRouter } from 'next/router'
import { ChromePicker } from 'react-color'
import toast from 'react-hot-toast'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default function Settings({ user }) {
  const [profile, setProfile] = useState(null)
  const [username, setUsername] = useState(user?.user_metadata.username??"not set -- you won't be able to view your list publicly")
  const [color, setColor] = useState(user?.user_metadata.color??"#F5F5F4")
  const [loading, setLoading] = useState(false)

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

  async function updateProfile(e) {
    e.preventDefault()

    try {
      setLoading(true)

      if (username === 'settings' || username ==='create-item' || username === 'edit-list' || username === 'sign-in' || username === 'index' || /\s/g.test(username) || /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(username)){
        throw ({message: 'username is not valid (no space or special chars)'})
      }

      const updates = {
        id: user.id,
        username: username,
        color: color,
      }

      let { error: profileError } = await supabase.from('profiles')
        .update( updates, { returning: 'minimal' })
        .match( { id: user.id })

      if (profileError) {
        throw profileError
      }
  
      let { error: metaError } = await supabase.auth.update({ 
        data: {
          username: username,
          color: color,
        } 
      })

      if (metaError) {
        throw metaError
      }

      toast.success("Updated your profile successfully!")
      setLoading(false)
      await sleep(1000)
      router.reload(window.location.pathname)
    } catch(error) {
      toast.error(error.message)
      setLoading(false)
    }
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/sign-in')
  }

  return (
    <div className="h-screen overflow-scroll" style={{backgroundColor:color}}>
      <div className="default-bg">
        <div className="default-card">
          <div className="flex justify-between">
            <h2 className="default-header"> settings </h2>
            <button onClick={signOut} className="button-secondary h-8 px-3 bg-stone-400 text-sm">sign out</button>
          </div>
          
          <p className="text-sm text-gray-500 mb-3"> your username: {username&&username} </p>
          <p className="text-sm mb-2"> change username </p>
          <div className="flex items-center mb-5">
            <input onChange={e => setUsername(e.target.value)} type="text" className="default-input mr-3" placeholder="new username" />
          </div>
          <p className="text-sm mb-1"> change profile color </p>
          <p className="text-xs italic text-gray-500 mb-3"> will be used for the background color of your list!</p>

          <div className="flex items-center mb-8">
            <div className="mr-5">
              <ChromePicker color={color} onChangeComplete={ (c) => setColor(c.hex)} disableAlpha={true}/>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button onClick={updateProfile} disabled={loading} className="button-secondary py-3">save</button>
          </div>
        </div>
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