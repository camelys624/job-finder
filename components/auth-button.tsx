"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogIn, Loader2 } from "lucide-react"
import MyAvatar from "@/components/MyAvatar"

export function AuthButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <Button variant="ghost" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }

  if (session) {
    return <MyAvatar />
  }

  return (
    <Link href="/auth/signin">
      <Button variant="ghost" className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        Sign In
      </Button>
    </Link>
  )
}