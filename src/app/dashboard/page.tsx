import { getAuthSession } from '@/lib/nextauth';
import { redirect } from 'next/navigation';
import React from 'react';
import QuizMeCard from '@/components/dashboard/QuixMeCard';
import HistoryCard from '@/components/dashboard/HistoryCard';
import HotTopicsCard from './HotTopicsCard'
import RecentActivities from '@/components/dashboard/RecentActivities';

type Props = {};
export const metadata={
  title: "Dashboard | Testify",
};
const Dashboard = async(props: Props) => {
  const session = await getAuthSession();
  if(!session?.user) {
    return redirect("/");
  }
  return <main className="p-8 mx-auto max-w-7xl">
     <div className="flex items-center">
      <h2 className='mr-2 text-3xl font-bold tracking-tight'></h2>
     </div>
     <div className="grid gap-4 mt-4 md:grid-cols-2">
      <QuizMeCard />
      <HistoryCard />
     </div>
     <div className="grid gap-4 mt-4 md:grid-cols-2 log:grid-cols-7">
      <HotTopicsCard/>
      <RecentActivities/>
     </div>
     </main>;
};

export default Dashboard;