import React from 'react';
import axios from 'axios'; // Import Axios
import fileIcon from '../assets/upload-file-svgrepo-com.svg';


class FileUpload extends React.Component {
  // Function to handle file selection
  handleFileUpload = async (event) => {
    // const [loading, setLoading] = useState(true);
    const file = event.target.files[0]; // Get the selected file
    const formData = new FormData();

    formData.append('file', file);
    // localStorage.setItem('filename',file.name)
    try {
      if (this.props.onStart) {
        this.props.onStart(); // Call onStart callback if provided
        // setLoading(true)
      }
      let session_id = localStorage.session_id;
      const response = await axios.post(`http://192.168.32.15:8005/api/v1/upload/pdf/${session_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      localStorage.setItem('filename', response.data.filename);
      if (this.props.onSuccess) {
        this.props.onSuccess(); // Call onSuccess callback if provided
        // setLoading(false)
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  render() {
    return (
      <div className="flex items-center flex-col">
        <input
          type="file"
          id="fileInput"
          ref={(fileInput) => (this.fileInput = fileInput)}
          style={{ display: 'none' }}
          onChange={this.handleFileUpload}
        />
        <button 
          onClick={() => this.fileInput.click()}
        >
          <img src={fileIcon} alt="Upload File" className="mr-2" style={{ width: '34px', height: '34px' }} />
        </button>
        {/* {!loading && <Loader />} */}
      </div>
    );
  }
}

export default FileUpload;
