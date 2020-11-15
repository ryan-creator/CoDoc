import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { storageBucket } from '../service/firebase';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

const UploadTest = () =>{
    const [text, setText] = React.useState("Click to upload");
    // To store user uploaded PDF, default is null
    var [pdf, setPDF] = useState(null);

    // When the upload button is pushed, push the selected document to firebase
    const handleUpload = () => {
        if(pdf != null){
            var storageRef = storageBucket.ref();

            storageRef.child('userDocs/' + pdf.name).put(pdf);
    
            var name = pdf.name;
    
            var url = storageRef.child('userDocs/'+name).getDownloadURL();
            
            // Get Promise fullfilled message, Ryan suggested using webhooks
            console.log(url);

            setText("Succeeded");
        }
    }; 

    // When the user selects a file, set pdf to the uploaded file
    const handleChange = (e) =>{
        setPDF(new File(e.target.files, e.target.files[0].name));
    };

    return (
        <div>
            {/*Only accept pdf files*/}
            <input type = "file" accept = ".pdf" onChange = {handleChange} />
            <Button startIcon={<CloudUploadIcon />} variant="contained" color="primary" onClick={handleUpload}> {text} </Button>
              </div>
    );
}

export default UploadTest;