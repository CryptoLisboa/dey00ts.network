import ProfilePage from '@/components/User/Profile'

export default function UserPage(ctx: any) {
  const twitterHandle = ctx.params.twitterHandle

  return <ProfilePage twitterHandle={twitterHandle} />
}
