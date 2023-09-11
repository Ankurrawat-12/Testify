import React from 'react'
import { Card } from './ui/card'
import { CheckCircle2, XCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

type Props = {
    correctAnswers: number,
    wrongAnswers: number,
}

const MCQCounter = ({correctAnswers,wrongAnswers}: Props) => {
  return (
    <Card className='flex justify-center items-center p-2'>
        <CheckCircle2 color='green' size={30}/>
        <span className='mx- text-2xl text-green-500'>{correctAnswers}</span>
        <Separator  orientation='vertical'/>
        <span className='mx- text-2xl text-red-500'>{wrongAnswers}</span>
        <XCircle color='red' size={30}/>
    </Card>
  )
}

export default MCQCounter