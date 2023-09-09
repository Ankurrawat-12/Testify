"use client"
import React from 'react'
import D3WordCloud from "react-d3-cloud"
import { useTheme } from 'next-themes'

type Props = {}
const data = [{
    text: "hey",
    value: 3
}, {
    text: "hello",
    value: 5
},
{
    text: "hee",
    value: 4
}, {
    text: "hee",
    value: 6
}, {
    text: "hee",
    value: 9
}]
const fontsizeMapper = (word: { value: number }) => {
    return Math.log2(word.value) * 5 + 16;
}
const CustomWordCloud = (props: Props) => {
    const theme = useTheme()
    return (
        <>
            <D3WordCloud data={data} height={250} font="Times" fontSize={fontsizeMapper} rotate={0} padding={10} fill={theme.theme == 'dark' ? "white" : "dark"} />
        </>
    )
}
export default CustomWordCloud;