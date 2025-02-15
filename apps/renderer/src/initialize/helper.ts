import type { User } from "@auth/core/types"

import { op } from "./op"

export const setIntegrationIdentify = async (user: User) => {
  op.identify({
    profileId: user.id,
    email: user.email,
    avatar: user.image,
    lastName: user.name,
    properties: {
      handle: user.handle,
      name: user.name,
    },
  })
  op.track("identify", {
    user_id: user.id,
  })
  await import("@sentry/react").then(({ setTag }) => {
    setTag("user_id", user.id)
    setTag("user_name", user.name)
  })
}
