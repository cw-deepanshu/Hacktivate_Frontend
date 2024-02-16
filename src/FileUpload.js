import { useState } from "react";
import axios from "axios";
const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        //console.log(file);
    };

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };
    const handleSubmit = async (e) => {
        const data = new FormData();

        const config = {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        };

        data.append("file", file);
        data.append("language", selectedLanguage);

        const response = await axios.post(
            "http://localhost:5000/upload",
            data,
            config
        );
        console.log(response);
    };    

    return (
        <div className="file-contaner">
            <div class="container">
                <div class="card">
                    <h3>Upload Files</h3>
                    <div class="drop_box">
                        <header>
                            <h4>Select File here</h4>
                        </header>
                        <p>Files Supported: .MP3 .MP4 .WAV</p>
                        <input
                            className="btn"
                            type="file"
                            accept=".mp3, .mp4, .wav"
                            multiple
                            onChange={handleFileChange}
                        />
                        <div className="lang">
                            <label>
                                <input
                                    type="radio"
                                    value="English"
                                    checked={selectedLanguage === "English"}
                                    onChange={handleLanguageChange}
                                />
                                English
                            </label>

                            {/* Hindi radio button */}
                            <label>
                                <input
                                    type="radio"
                                    value="Hindi"
                                    checked={selectedLanguage === "Hindi"}
                                    onChange={handleLanguageChange}
                                />
                                Hindi
                            </label>
                        </div>
                        <button className="submit" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default FileUpload;