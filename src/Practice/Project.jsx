import React, { useState, useEffect } from 'react';

const questions = [
  {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { answerText: 'New York', isCorrect: false },
      { answerText: 'London', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Dublin', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
  {
    questionText: 'Who is CEO of Tesla?',
    answerOptions: [
      { answerText: 'Jeff Bezos', isCorrect: false },
      { answerText: 'Elon Musk', isCorrect: true },
      { answerText: 'Bill Gates', isCorrect: false },
      { answerText: 'Tony Stark', isCorrect: false },
    ],
  },
];

const Project = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [storedAnswers, setStoredAnswers] = useState({});
  const [isSubmitMode, setIsSubmitMode] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
    setStoredAnswers(savedAnswers);
    setScore(Object.values(savedAnswers).filter(answer => answer.isCorrect).length);
  }, []);

  const handleAnswerChange = (answerOption) => {
    setSelectedAnswer(answerOption);
  };

  const handleSubmitButtonClick = () => {
    if (!selectedAnswer) {
      return;
    }

    const updatedAnswers = { ...storedAnswers, [currentQuestion]: selectedAnswer };
    localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));
    setStoredAnswers(updatedAnswers);

    if (selectedAnswer.isCorrect) {
      setScore(score + 1);
      setFeedback('Correct!');
    } else {
      setFeedback(`Wrong! The correct answer is ${questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText}`);
    }

    setIsSubmitMode(true);
  };

  const handleContinueButtonClick = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setFeedback('');
      setSelectedAnswer(null);
      setIsSubmitMode(false);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].questionText}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`answer-${index}`}
                  name="answer"
                  value={answerOption.answerText}
                  checked={selectedAnswer === answerOption}
                  onChange={() => handleAnswerChange(answerOption)}
                  disabled={isSubmitMode} // Disable checkboxes after submitting
                />
                <label htmlFor={`answer-${index}`}>{answerOption.answerText}</label>
              </div>
            ))}
          </div>
          {feedback && <div className="feedback">{feedback}</div>}
          <div className="submit-continue-section">
            {!isSubmitMode && <button onClick={handleSubmitButtonClick}>Submit</button>}
            {isSubmitMode && <button onClick={handleContinueButtonClick}>Continue</button>}
          </div>
        </>
      )}
    </div>
  );
};

export default Project;
