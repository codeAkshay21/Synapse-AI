// src/app/(dashboard)/layout.tsx
import { onLoginUser } from '@/actions/auth'
import SideBar from '@/components/sidebar'
import { ChatProvider } from '@/context/user-chat-context'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const OwnerLayout = async ({ children }: Props) => {
  const result = await onLoginUser()

  if (!result || result.status !== 200 || !result.user) {
    // Optional: redirect or show fallback UI
    return <div className="p-4 text-red-500">Not authorized</div>
  }

  return (
    <ChatProvider>
      <div className="flex h-screen w-full bg-background">
        <SideBar domains={result.domain} />
        <main className="w-full h-screen flex flex-col pl-20 md:pl-4 bg-background text-foreground">
          {children}
        </main>
      </div>
    </ChatProvider>
  )
}

export default OwnerLayout
