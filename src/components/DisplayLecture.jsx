import React from 'react';
import Lecture from '../resources/pdf/lec01.pdf';
import PDFViewer from 'pdf-viewer-reactjs'

const DisplayLecture = () =>{
    return (
        <div>
            <PDFViewer document={{
                url : Lecture,
            }}/>
        </div>
    );
}

export default DisplayLecture;