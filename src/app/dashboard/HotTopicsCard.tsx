import CustomWordCloud from '@/components/ui/CustomWordCloud'
import { Card, CardHeader, CardTitle, CardDescription,CardContent} from '@/components/ui/card'
import React from 'react'
type Props={}
const HotTopicsCard=(props:Props)=>{
    return(
        <Card className='col-span-4'>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>Hot Topics</CardTitle>
                <CardDescription>
                    Click on a topic to start a quiz on it!
                </CardDescription>
            </CardHeader>
            <CardContent className='pl-2'><CustomWordCloud/></CardContent>
        </Card>
    )
}
export default HotTopicsCard