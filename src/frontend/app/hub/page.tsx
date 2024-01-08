// 'use client';
import DocumentUploader from '@/components/DocumentUploader';
import Navbar from '@/components/Navbar';

export default function Page() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <Navbar />
            {/* <DocumentUploader></DocumentUploader> */}
            <h1>Hub Page</h1>
            <p>This is the content of Page 3.</p>
        </main>
    );

}