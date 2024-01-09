// import React, { useState } from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';

// import { Document, Page, pdfjs} from 'react-pdf';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// interface Props {
//     pdfPath: string |  null;
// }

// const PDFViewer = ({ pdfPath } : Props) => {
//   const [numPages, setNumPages] = useState(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//         <Viewer fileUrl={pdfPath} onDocumentLoadSuccess={onDocumentLoadSuccess} />
//       {/* <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
//       </Worker> */}
//       <p>Number of pages: {numPages}</p>
//     </div>
//   );
// };

// export default PDFViewer;
