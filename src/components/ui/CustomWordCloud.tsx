"use client"
import React from 'react'
import D3WordCloud from "react-d3-cloud"
import { useTheme } from 'next-themes'

type Props = {}
const data = [{
    text: "Naruto",
    value: 3
}, {
    text: "One Piece",
    value: 5
},
{
    text: "Jujutsu Kaisen",
    value: 4
}, {
<<<<<<< HEAD
    text: "Web Development",
    value: 6
}, {
    text: "Hindu",
=======
    text: "Hindu",
    value: 6
}, {
    text: "Web Devleopment",
>>>>>>> 7c6d0a51e982075d01563be4f4881310dbc77e93
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