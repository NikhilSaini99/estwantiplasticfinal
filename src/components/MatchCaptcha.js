import { useState, useEffect } from "react";
import CustomButton from "./Button";
import { Box, Stack, TextField, Typography } from "@mui/material";

const MathCaptcha = ({ onSubmit }) => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
 

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
      onSubmit();

    } else {
      setIsCorrect(false);
      alert('Wrong Captcha Please re-try again')
    }
  
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Typography variant="body1" textAlign='center'>
        Solve Captcha<br /></Typography>
      <Stack sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
        <Typography sx={{fontWeight:'bold',color:'black'}}>{num1} + {num2} =</Typography>
        <TextField
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isCorrect}
        />
        <Box sx={{ alignSelf: "center" }}>
          <CustomButton text='Check Answer' bgColor='#2C306F' handleClick={checkAnswer} />
          {isCorrect && <Typography variant="body1" sx={{fontWeight:'bold',color:'black'}}>Correct answer!</Typography>}
          {/* {!isCorrect && answer !== "" && <p>Incorrect answer. Try again.</p>} */}
        </Box>
      </Stack>

    </Box>
  );
};

export default MathCaptcha;
