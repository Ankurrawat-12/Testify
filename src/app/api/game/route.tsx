//api/game
import { getAuthSession } from "@/lib/nextauth";
import { NextResponse } from "next/server";
import { quizCreationSchema } from "../../../schemas/form/quiz";
import { ZodError } from "zod";
import { prisma } from "@/lib/db";
import axios from "axios";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        {
          error: "You must be logged in to create a quiz",
        },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { amount, type, topic } = quizCreationSchema.parse(body);
    const game = await prisma.game.create({
      data: {
        gameType: type,
        timeStarted: new Date(),
        userId: session?.user.id,
        topic,
      },
    });
    const { data } = await axios.post(`${process.env.API_URL}/api/question`, {
      amount,
      type,
      topic,
    });
    if (type === "mcq") {
      type mcqQuestion = {
        question: string;
        answer: string;
        choice1: string;
        choice2: string;
        choice3: string;
      };
      let manyData = await data.questions.map((question: any) => {
        const option = [
          question.choices[0],
          question.choices[1],
          question.choices[2],
          question.choices[3],
        ];

        return {
          question: question.question,
          answer: question.choices[0],
          options: JSON.stringify(option),
          gameId: game.id,
          questionType: "mcq",
        };
      });
      await prisma.question.createMany({
        data: manyData,
      });
    }
    if (type === "open_ended") {
      let manyData = await data.questions.map((question: any) => {
        return {
          question: question.question,
          answer: question.answer || "defaultAnswer",
          gameId: game.id,
          questionType: "open_ended",
        };
      });
      console.log(manyData);
      await prisma.question.createMany({
        data: manyData,
      });
    }
    return NextResponse.json({
      gameId: game.id,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.issues,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        error: "Something want wrong",
      },
      {
        status: 500,
      }
    );
  }
}
