'use client';
import DocumentSelection from '@/components/DocumentSelection';
import Navbar from '@/components/Navbar';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
} from '@mui/material';


const SERVER_URL = "http://127.0.0.1:8000" // process.env.SERVER_URL;

export default function QA() {
    console.log(SERVER_URL)
    const http = axios.create({
        baseURL: SERVER_URL,
        headers: {
          "Content-type": "application/json",
        },
    });

    const [documentId, setDocumentId] = useState<string>('');
    const [newQuestion, setNewQuestion] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [answer, setAnswer] = useState<string>('');
    const [error, setError] = useState<string>('');


    const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.target.value);
    };
    
    const handleAskQuestion = () => {
        if (newQuestion.trim() !== '') {
            http.post("/api/v1/conversations/answer_question",
            {
                document_id: documentId,
                question: newQuestion
            }, 
            {
                "headers": { "Content-Type": "application/json"}
            }
            ).then((response) => {
                setQuestion(newQuestion)
                setAnswer(response.data.answer)
            }, (error) => {
                if (axios.isAxiosError(error))  {
                    // Access to config, request, and response
                    setError(error.response?.data)
                  } else {
                    // Just a stock error
                  }
            })
        }
    };

    return (
        <Container className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar />
            <h1 style={titleStyle}>Q&A Page</h1>
            <DocumentSelection setSelectedDocumentId={setDocumentId}/>
            
            <Paper elevation={3} style={paperStyle} className='flex items-center flex-col'>
                <TextField
                    fullWidth
                    label="Ask a Question"
                    variant="outlined"
                    value={newQuestion}
                    onChange={handleQuestionChange}
                />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAskQuestion}
                style={addButtonStyle}
            >
                Ask Question
            </Button>
            </Paper>
            
            <Paper elevation={3} style={paperStyle}>
                <Typography variant="body1" style={questionStyle}>
                    <b>Question:</b> {question}
                    <br></br>
                    <b>Answer:</b> {answer}
                </Typography>
            </Paper>
        </Container>
    );
}

const paperStyle: React.CSSProperties = {
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',


};

const addButtonStyle: React.CSSProperties = {
    marginTop: '10px',
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '12px',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '5px',
    color: '#fff',
    backgroundColor: '#3498db',
    border: '2px solid #2980b9',
    transition: 'background-color 0.3s, border-color 0.3s',
    cursor: 'pointer',
    outline: 'none',
};

const questionStyle: React.CSSProperties = {
    marginBottom: '10px',
};


const titleStyle: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333', // Set your desired font color
    // Add more styles as needed
    // ...
  };
