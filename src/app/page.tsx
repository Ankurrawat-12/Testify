import SignInButton from '@/components/SignInButton'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuthSession } from '@/lib/nextauth'
import {redirect} from 'next/navigation';


export default async function Home() {
  const session = await getAuthSession();
  if(session?.user){
    redirect('/dashboard')
  }
  return (
    <div className="absolute -translate-x-1/2 top-1/2 left-1/2 -translate-y-1/2 ">
      <Card className='w-[300px]'>
        <CardHeader>
          <CardTitle>Welcome to Testify! :)</CardTitle>
          <CardDescription>Testify is a platform for students to revise topics using the Ai generated Tests/Quizzes. Get Started by Loggin in below!!</CardDescription>
        </CardHeader>
        <CardContent>
          <SignInButton text="Sign In With Google"/>
        </CardContent>
      </Card>
    </div>
  )
}
