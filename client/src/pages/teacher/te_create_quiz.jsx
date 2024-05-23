import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CreateQuiz = () => {
    const [questions, setQuestions] = useState([{ question: '', answers: ['', '', '', '', ''], correctAnswer: '' }]);
    const navigate = useNavigate();

    const handleQuestionChange = (index, event) => {
        const newQuestions = [...questions];
        newQuestions[index].question = event.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (qIndex, aIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].answers[aIndex] = event.target.value;
        setQuestions(newQuestions);
    };

    const handleCorrectAnswerChange = (qIndex, event) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].correctAnswer = event.target.value.replace(/[^1-5]/g, '');
        setQuestions(newQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, { question: '', answers: ['', '', '', '', ''], correctAnswer: '' }]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(questions); // This is where you would handle the quiz submission, e.g., sending it to an API.
        navigate('/te_calender');
    };

    return (
        <div className="rounded-s-3xl bg-white md:ml-72 md:px-10 py-8 w-full">
            <div className="mb-4">
                <h2 className="text-2xl font-bold mb-3 text-indigo-800">Sample Quiz Title</h2>
                <span className="font-medium">Selected course ID :</span>
                <span className="text-indigo-600"> 1101 </span>
                <div></div>
                <span className="font-medium">Due date and time :</span>
                <span className="text-indigo-600"> 2024-04-24 14:00 </span>
            </div>

            <Form onSubmit={handleSubmit}>
                {questions.map((question, qIndex) => (
                    <div key={qIndex} className="mb-4 bg-gray-100 px-4 py-3.5 rounded-lg shadow-md">
                        <Form.Group controlId={`formQuestion${qIndex}`} className="mb-4">
                            <Form.Label className="font-bold text-gray-700">Question {qIndex + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                value={question.question}
                                onChange={(event) => handleQuestionChange(qIndex, event)}
                                placeholder="Enter question"
                                className="shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md"
                            />
                        </Form.Group>
                        {question.answers.map((answer, aIndex) => (
                            <Form.Group key={aIndex} controlId={`formAnswer${qIndex}-${aIndex}`} className="mb-3 w-11/12 ml-auto mr-auto">
                                <span className="block text-gray-700 font-medium mb-2 ml-6 w-full">{aIndex + 1}.{' '} 
                                <span className="inline-block w-11/12">
                                    <Form.Control
                                        type="text"
                                        value={answer}
                                        onChange={(event) => handleAnswerChange(qIndex, aIndex, event)}
                                        placeholder={`Enter answer ${aIndex + 1}`}
                                        className="shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block w-full sm:text-sm border-gray-300 rounded-md"
                                    />
                                </span>
                                </span>
                            </Form.Group>
                        ))}
                        <Form.Group controlId={`formCorrectAnswer${qIndex}`} className="mb-2 mt-3 text-center w-5/12 ml-auto mr-auto">
                            <Form.Label className="font-bold text-gray-700 w-6/12">Enter correct answer (1-5)</Form.Label>
                            <div className='w-2/12 text-center ml-48'>
                            <Form.Control
                                type="text"
                                value={question.correctAnswer}
                                onChange={(event) => handleCorrectAnswerChange(qIndex, event)}
                                maxLength="1"
                                placeholder="Answer"
                                className="shadow-sm focus:ring-indigo-600 focus:border-indigo-600 block sm:text-sm border-gray-300 rounded-md"
                            />
                            </div>
                        </Form.Group>
                    </div>
                ))}

                <div className='ml-auto mr-auto w-4/12 mt-2'>
                    <Button variant="secondary" onClick={addQuestion} className="mb-3 w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded">
                        Add a question
                    </Button>
                    <Button variant="primary" type="submit" className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-semibold py-2 px-4 rounded">
                        Publish Quiz
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default CreateQuiz;
