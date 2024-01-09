'use client';
import DocumentSelection from '@/components/DocumentSelection';
import Navbar from '@/components/Navbar';
// import PDFViewer from '@/components/PDFViewer';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import {
    Container,
    Typography,
    TextField,
    Button,
    Paper,
    Box,
} from '@mui/material';


const SERVER_URL = "http://127.0.0.1:8000" // process.env.SERVER_URL;

export default function DocsHub() {
    const http = axios.create({
        baseURL: SERVER_URL,
        headers: {
          "Content-type": "application/json",
        },
    });

    const [documentId, setDocumentId] = useState<string>('');

    const handleDeleteAll = () => {
        console.log("Delete All")
        http.delete("/api/v1/documents/").then((response) => {
            // toast.success('Delete all documents successfully!');
            window.location.reload();
        }, (error) => {
            // toast.error('Can not connect to server!');
        })
    };

    const handleDeleteSingleDocument = () => {
        console.log("Delete ", documentId)
        http.delete("/api/v1/documents/" + documentId).then((response) => {
            // toast.success('Delete document successfully!');
            window.location.reload();
        }, (error) => {
            if (axios.isAxiosError(error))  {
                // Access to config, request, and response
                
                } else {
                // Just a stock error
                }
        })
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar />
            <h1 style={titleStyle}>Document Hub</h1>
            <DocumentSelection setSelectedDocumentId={setDocumentId}/>
            <Paper elevation={3} style={paperStyle}>
                PDF Viewer field
            </Paper>
            <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteSingleDocument}
                style={addButtonStyle}
            >
                Delete this selected document
            </Button>

            <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteAll}
                style={addButtonStyle}
            >
                Delete all documents
            </Button>
            {/* <ToastContainer /> */}
        </main>
    );
}

const paperStyle: React.CSSProperties = {
    padding: '20px',
    marginBottom: '20px',
    backgroundColor: 'white',
};

const addButtonStyle: React.CSSProperties = {
    marginTop: '10px',
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
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
