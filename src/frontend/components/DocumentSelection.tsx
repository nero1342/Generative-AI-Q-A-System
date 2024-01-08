'use client';
import React, { useState, useEffect, useRef } from 'react';
import {
  Select,
  MenuItem,
  SelectChangeEvent 
} from '@mui/material';

import axios from 'axios';

const SERVER_URL = "http://127.0.0.1:8000" // process.env.SERVER_URL;

interface QAProps {
    setSelectedDocumentId: React.Dispatch<React.SetStateAction<string>>;
}
const DocumentSelection: React.FC<QAProps> = ( {setSelectedDocumentId} ) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    
    const http = axios.create({
        baseURL: SERVER_URL,
        headers: {
          "Content-type": "application/json",
        },
    });

    useEffect(() => {
      // Fetch the options from the server
        http.get("/api/v1/documents/")
        .then(response => {
            console.log(response.data)
            setOptions(response.data);
            if (response.data.length > 0) {
                setSelectedOption(response.data[0])
                setSelectedDocumentId(response.data[0])
            }
        })
        .catch(error => {
          console.error('Error fetching options from the server:', error);
        });

    }, [http, setSelectedDocumentId]); // Empty dependency array to run the effect only once on component mount
  
    const handleSelectChange = (event: SelectChangeEvent<string>) => {
      setSelectedOption(event.target.value as string);
      setSelectedDocumentId(event.target.value as string)
    };
  
    return (
      <Select 
        value={selectedOption}
        onChange={handleSelectChange}
        label="Select a target document"
      >
        {options.map((option, index) => (      
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  };
  
export default DocumentSelection;
  