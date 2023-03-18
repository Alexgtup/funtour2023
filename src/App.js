import React, { useState, useEffect, useRef } from 'react';
import {answers} from './answers.js'
import {questions} from './questions.js'
import './index.css';

function Site() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [typingText, setTypingText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const typingTextRef = useRef(null);

  useEffect(() => {
    if (selectedQuestion !== null) {
      const text = answers.find(answer => answer.id === selectedQuestion).text;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setTypingText(prevTypingText => prevTypingText + text[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
          typingTextRef.current.scrollLeft = typingTextRef.current.scrollWidth;
        } else {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }
  }, [selectedQuestion, currentIndex]);

  function handleQuestionClick(questionId) {
    setSelectedQuestion(questionId);
    setTypingText("");
    setCurrentIndex(0);
  }

  return (
    <div className="site">
      <div className="questions">
        {questions.map((question) => (
          <div key={question.id} className={`question ${selectedQuestion === question.id ? 'selected' : ''}`} onClick={() => handleQuestionClick(question.id)}>
            {question.text}
          </div>
        ))}
      </div>
      <div className="answers">
        {selectedQuestion && (
          <>
            <div className="typing-text" ref={typingTextRef}>{typingText}<div className="cursor"></div></div>

          </>
        )}
      </div>
    </div>
  );
}

export default Site;
