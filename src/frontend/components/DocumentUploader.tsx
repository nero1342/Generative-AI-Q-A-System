'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
// import PDFViewer from './PDFViewer'; // Import the PDFViewer component
import axios from 'axios';

const SERVER_URL = "http://127.0.0.1:8000" // process.env.SERVER_URL;


const DocumentUploader: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [name, setName] = useState<string>('');

    const http = axios.create({
        baseURL: SERVER_URL,
        headers: {
          "Content-type": "application/json",
        },
    });
    useEffect(() => {
        http.get('/health')
        .then((response) => {
            console.log("Health-check ok - " + SERVER_URL);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // console.log(SERVER_URL);

    const onDrop = (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setFile(acceptedFiles[0]);
            
        }
    };
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
        'application/pdf':      ['.pdf']
        }, // Add the accepted file types here,
        maxFiles: 1,
        maxSize: 5e6
    });



    // const handleSubmit = () => {
    //     // Your event handling logic goes here
    //     console.log('Button clicked!');
    // };
    
     
    const handleSubmit = async () => {
        console.log(name)
        if (file)
                console.log("Test 2" + file.name);
            else 
                console.log("Null upload")
 
        // http.post('/api/v1/documents/upload', {file: file}, {
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     }
        //   }).then((response) => {
        //     console.log("Test submit" + SERVER_URL);
        // });
        if (file && name) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);

            try {
                // Use axios to submit the file and name to the server
                // http.post("/api/v1/documents/upload2")
                http.post("/api/v1/documents/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then((response) => {})
            } catch (error) {

            }
        }
    };
  return (
    <Container>
        <Typography>
            <Box {...getRootProps()} style={dropzoneStyle}>
                <input {...getInputProps()} />
                <CloudUploadIcon style={uploadIconStyle} />
                <Typography variant="h6" style={uploadText}>
                    Drag & Drop or Click to Upload a Document (PDF)
                </Typography>  
                <br></br>
                <Typography variant="h6" color={"red"}>
                    Please dont include personal document as it will be saved as raw text in the DB    
                </Typography>   
                {file && (
                    <div>
                    <p>Selected File: {file.name}</p>
                    </div>
                )}       
            </Box>

            <TextField id="document_name" label="Document Name" variant="outlined" onChange={(e) => setName(e.target.value)} />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit} 
                style={addButtonStyle}
            >
                Upload File
            </Button>
            
        </Typography>
    </Container>
  );
};

const containerStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

const paperStyle: React.CSSProperties = {
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: 'white',
};

const titleStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '20px',
  color: '#2196f3',
};

const dropzoneStyle: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  textAlign: 'center',
  padding: '20px',
  cursor: 'pointer',
};

const uploadIconStyle: React.CSSProperties = {
  fontSize: 80,
  marginBottom: '10px',
  color: '#2196f3',
};

const uploadText: React.CSSProperties = {
  marginBottom: '10px',
  color: '#666',
};

const addButtonStyle: React.CSSProperties = {
  marginTop: '10px',
};

const questionStyle: React.CSSProperties = {
  marginBottom: '10px',
};

export default DocumentUploader;