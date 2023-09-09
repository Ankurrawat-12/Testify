'use client';
import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import {useForm} from 'react-hook-form';
import {quizCreationSchema} from '@/schemas/form/quiz'
import { z } from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormLabel,
    FormMessage,
    FormItem
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import { BookOpen, CopyCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';


type Props = {}

type Inputs = z.infer<typeof quizCreationSchema>
const QuizCreation = (props: Props) => {
    const form = useForm<Inputs>({
        resolver: zodResolver(quizCreationSchema),
        defaultValues: {
            amount: 3,
            topic: '',
            type: 'open_ended',
        }
    })

    function onSubmit(input: Inputs) {
        alert(JSON.stringify(input, null, 0))
    }

    form.watch();
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <Card>
            <CardHeader>
                <CardTitle className='text-2xl font-bold'>Quiz Creation</CardTitle>
                <CardDescription>Choose a topic</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Topic</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter the topic here.. " {...field} />
                            </FormControl>
                            <FormDescription>
                                Provide a topic for your quiz
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                         <FormField
                        control={form.control}
                        name="amount"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Number of Questions</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter an amount.. " {...field}
                                 onChange={(e) => {
                                    form.setValue('amount', parseInt(e.target.value) )
                                 }}
                                 min={1}
                                 max={10}
                                 type='number'
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className='flex justify-between'>
                            <Button className='w-1/2 rounded-none rounded-l-lg py-5' 
                            type='button'
                            variant={form.getValues('type') === 'mcq' ? "default" : "secondary"}
                            onClick={()=>{
                                form.setValue('type', 'mcq')
                            }}>
                                <CopyCheck className='w-4 h-4 mr-2' /> Multiple Choice
                            </Button>
                            <Separator orientation='vertical'/>
                            <Button className='w-1/2 rounded-none rounded-r-lg py-5' 
                            type='button'
                            variant={form.getValues('type') === 'open_ended' ? "default" : "secondary"}
                            onClick={()=>{
                                form.setValue('type', 'open_ended')
                            }}>
                                <BookOpen className='w-4 h-4 mr-2' /> Open Ended
                            </Button>
                        </div>
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  )
}

export default QuizCreation