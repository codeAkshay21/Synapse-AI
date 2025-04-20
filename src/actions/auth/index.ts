'use server'

import { client } from '@/lib/prisma'
import { currentUser, redirectToSignIn } from '@clerk/nextjs'
import { onGetAllAccountDomains } from '../settings'

export const onCompleteUserRegistration = async (
  fullname: string,
  clerkId: string,
  type: string
) => {
  try {
    const registered = await client.user.create({
      data: {
        fullname,
        clerkId,
        type,
        subscription: {
          create: {},
        },
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    })

    if (registered) {
      return { status: 200, user: registered }
    }
  } catch (error) {
    console.error('User registration error:', error)
    return { status: 400, error: 'User registration failed' }
  }
}

export const onLoginUser = async () => {
  const user = await currentUser()
  if (!user) return redirectToSignIn()

  try {
    let authenticated = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        fullname: true,
        id: true,
        type: true,
      },
    })

    if (!authenticated) {
      // Auto-register user
      const defaultFullname =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.emailAddresses[0]?.emailAddress?.split('@')[0] || 'Unnamed User'

      authenticated = await client.user.create({
        data: {
          clerkId: user.id,
          fullname: defaultFullname,
          type: 'owner', // Change to 'user' if not every user should be 'owner'
          subscription: {
            create: {},
          },
        },
        select: {
          fullname: true,
          id: true,
          type: true,
        },
      })
    }

    const domains = await onGetAllAccountDomains()

    return {
      status: 200,
      user: authenticated,
      domain: domains?.domains || [],
    }
  } catch (error) {
    console.error('Login Error:', error)
    return { status: 400, error: 'Login failed' }
  }
}
