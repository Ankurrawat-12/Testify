import { BingChat } from "bing-chat";
import { number } from "zod";

const BING_COOKIE =
  "1CG272MvMcOJgrwaRqO2IFXe3YkYoOE2RVzGTmN3HAr8VVYrYMW6dUmsJ-zj6O1W-UPX7g2m_pjQhapfNViaHFTuz7YRY5xENe-PdRo5SUgizlQVsnyMcDxU0oLQUv9kxJBel0UnfLyR0b-M1dDe6LYM4e7q1RGs-fSeXgCfqkpEv_DnWM-2fxTZS_A07bx6Qge4tuW2voDT7bGehfrPK9g";

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
  if (type === "mcq") {
    const res = await api.sendMessage(
      `create ${
        3 * amount
      } ${type} on ${topic}  all question should 5  word  and all  options  should 9 word all of these in new line  `
    );
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
        const answer: string = element.choices[element.choices.length - 2];
        const option1: string = element.choices[element.choices.length - 1];
        const option2: string = element.choices[element.choices.length - 3];
        const option3: string = element.choices[element.choices.length - 4];
        const object = {
          question: question,
          choices: [answer, option1, option2, option3],
        };
        refined.push(object);
      }
    });

    return refined;
  } else {
    const data = await api.sendMessage(
      `create ${amount} ${type} question and answer on ${topic}  all question should 5  word  and  answers and question both should in in new line  `
    );
    const inputText = data.text;

    // Split the input text into lines
    const lines = inputText.split("\n").map((line) => line.trim());

    // Initialize an array to store the extracted questions and answers
    const extractedData = [];
    let currentPair = { question: "", answer: "" };

    // Loop through each line
    for (const line of lines) {
      if (line.match(/^\d+\.\s/)) {
        // This line starts with a number followed by a period and a space, it's a new question
        if (currentPair.question !== "") {
          // If there's an existing question, push it to the extractedData
          extractedData.push(currentPair);
        }
        // Start a new question
        currentPair = { question: line.replace(/^\d+\.\s/, ""), answer: "" };
      } else {
        // This line is part of the answer
        currentPair.answer += (currentPair.answer === "" ? "" : "\n") + line;
      }
    }

    // Push the last question-answer pair to extractedData
    extractedData.push(currentPair);

    // Output the extracted questions and answers as an array of objects

    return extractedData;
  }

  // print the full text at the end
}
