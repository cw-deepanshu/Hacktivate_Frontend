import { useState } from "react";
import axios from "axios";
const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [htmlResponse, setHtmlResponse] = useState();
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        //console.log(file);
    };
    const [loader, setLoader] = useState(false);

    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };
    const handleSubmit = async (e) => {
        if (file == null) {
            alert("Audio File not selected");
            return;
        }
        const data = new FormData();
        setLoader(true);
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
        console.log(response.data);
        setHtmlResponse(response.data);
    };

    return (
        <div className="file-contaner">
            <div class="container">
                <div class="card">
                    <h3>Upload Call Recording</h3>
                    <div class="drop_box">
                        <header>
                            <h4>Select File here</h4>
                        </header>
                        <p>Files Supported: .MP3 .MP4 .WAV</p>
                        <input
                            className="btn"
                            type="file"
                            accept=".mp3, .mp4, .wav"
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
            {/* <div>
                {htmlResponse}
            </div> */}
            {loader && htmlResponse == null ? (
                <h1>Fetching Insights...</h1>
            ) : (
                <div
                    class="res"
                    dangerouslySetInnerHTML={{ __html: htmlResponse }}
                />
            )}
        </div>
    );
};

export default FileUpload;
