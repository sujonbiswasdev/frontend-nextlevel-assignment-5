"use client"

import { Share2 } from "lucide-react"
import { toast } from "react-toastify"

interface Props {
  userId: string
  userName: string
}

export default function ShareProfileButton({ userId, userName }: Props) {

  const handleShare = async () => {
    const profileUrl = `${window.location.origin}/profile/${userId}`

    try {
      if (navigator.share) {
        await navigator.share({
          title: `${userName}'s Profile`,
          text: `Check out ${userName}'s profile`,
          url: profileUrl,
        })
      } else {
        await navigator.clipboard.writeText(profileUrl)
        toast.success("Profile link copied to clipboard")
      }
    } catch (error) {
      toast.error("Something went wrong while sharing")
    }
  }

  return (
    <button 
      onClick={handleShare}
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95 mb-2 ml-2 mt-2 justify-end"
    >
      <Share2 size={18} />
      Share Profile
    </button>
  )
}