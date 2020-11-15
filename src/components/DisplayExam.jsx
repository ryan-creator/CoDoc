import React, {useContext} from 'react';
import INFO201 from '../resources/pdf/INFO201.pdf';
import INFO204 from '../resources/pdf/INFO204.pdf';
import INFO303 from '../resources/pdf/INFO303.pdf';
import INFO408 from '../resources/pdf/INFO408.pdf';
import INFO411 from '../resources/pdf/INFO411.pdf';
import PDFViewer from 'pdf-viewer-reactjs'
import { Context } from "../providers/PaperProvider";

const DisplayPDF = () =>{
    const [state] = useContext(Context);

    var list = []; 
        list['INFO201'] = INFO201;
        list['INFO204'] = INFO204;
        list['INFO303'] = INFO303;
        list['INFO408'] = INFO408;
        list['INFO411'] = INFO411;

    return (
        
        <div>
            <PDFViewer document={{
                url : list[state],
            }}/>
        </div>
    );
}

export default DisplayPDF;