import { BingChat } from "bing-chat";
import { number } from "zod";

const BING_COOKIE ="Bing cookieasdfad";
// const user_prompt = ` generate  random hard ${amount} ${type} question about ${topic} and question should be in  doublequote that differentiate question and option`;
// const question=system_prompt+output_format_prompt+user_prompt;
export async function strict_output(
  amount: number,
  topic: String,
  type: String
) {
  const api = new BingChat({
    cookie: BING_COOKIE, // Use the constant BING_COOKIE here
  });

  const res = await api.sendMessage(
    `create ${
      2* amount
    } ${type} on ${topic}  all question should 5  word  and all  options  should 8 word and answer should 9 word all of these in new line  `
  );
console.log(amount);
  const inputString: string = res.text;
  const questionsArray: string[] = inputString.split(/\d+\./).filter(Boolean);

  // Define a type for a question
  type Question = {
    question: string;
    choices: string[];
  };

  // Initialize an array to store the extracted questions and choices
  const extractedQuestions: Question[] = [];

  // Loop through each question to extract the question and choices
  questionsArray.forEach((question) => {
    // Split the question into lines
    const lines: string[] = question.trim().split("\n");

    // Extract the question text (first line)
    const questionText: string = lines[0].trim();

    // Extract the choices (lines starting with letters A, B, C, etc.)
    const choices: string[] = lines
      .slice(1)
      .map((line) => line.trim())
      .filter(Boolean);

    // Store the question and choices in an object
    const questionObj: Question = {
      question: questionText,
      choices: choices,
    };

    // Add the question object to the extractedQuestions array
    extractedQuestions.push(questionObj);
  });
  let refined: any = [];
  extractedQuestions.forEach((element) => {
    if (element.choices.length === 4 || element.choices.length === 5) {
      const question: string = element.question;
      const option1: string = element.choices[element.choices.length - 2];
      const option2: string = element.choices[element.choices.length - 1];
      const option3: string = element.choices[element.choices.length - 3];
      const option4: string = element.choices[element.choices.length - 4];
      const object = {
        question: question,
        choices: [option1, option2, option3, option4],
      };
      refined.push(object);
    }
  });

  return refined;
  // print the full text at the end
}