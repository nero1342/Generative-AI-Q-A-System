// 'use client';
import DocumentUploader from '@/components/DocumentUploader';
import Navbar from '@/components/Navbar';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-48">
            <Navbar />
            <h1 style={titleStyle}>Upload Page</h1>
            <DocumentUploader></DocumentUploader>
        </main>
    );

}


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
