import { useState, useEffect } from "react";
import CustomButton from "./Button";
import { Box, Stack, TextField } from "@mui/material";

const MathCaptcha = ({ onSubmit }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const generateRandomNumbers = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setNum1(num1);
    setNum2(num2);
    setAnswer("");
    setIsCorrect(false);
  };

  const checkAnswer = () => {
    const expectedAnswer = num1 + num2;
    const userAnswer = parseInt(answer, 10);
    if (userAnswer === expectedAnswer) {
      setIsCorrect(true);
      onSubmit(); // Call the onSubmit function provided by the parent component
    } else {
      setIsCorrect(false);
    }
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <p>
        Solve the following math question:<br /></p>
      <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems:'center',gap:'1rem' }}>
        {num1} + {num2}=
        <TextField
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </Stack>
      <Box sx={{alignSelf:"center"}}>
      <CustomButton text='Submit' bgColor='#2C306F' handleClick={checkAnswer}/>
      {/* <button onClick={checkAnswer}>Submit</button> */}
      {isCorrect && <p>Correct answer!</p>}
      {!isCorrect && answer !== "" && <p>Incorrect answer. Try again.</p>}
      </Box>
    </Box>
  );
};

export default MathCaptcha;
