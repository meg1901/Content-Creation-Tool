// frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// src/App.js or src/index.js
import './styles.css'; // Adjust the path if necessary


function App() {
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [tone, setTone] = useState('Formal');
    const [wordCount, setWordCount] = useState(100);
    const [generatedContent, setGeneratedContent] = useState('');

    const handleGenerateContent = async () => {
      console.log("helloconsole");
      
        try {
            const response = await axios.post('http://localhost:5000/generate_content', {
                description,
                keywords,
                tone,
                wordCount,
            });
            setGeneratedContent(response.data.content);
        } catch (error) {
            console.error('Error generating content:', error);
        }
    };

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-md-6 left-section d-flex flex-column justify-content-center">
                    <h2 className="text-center"><strong>CONTENT INPUT</strong></h2>
                    <form>
                        <div className="form-group">
                            <label htmlFor="description">Brief Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="4"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter a brief description..."
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="keywords">Keywords</label>
                            <textarea
                                className="form-control"
                                id="keywords"
                                rows="3"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="Enter keywords..."
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tone">Tone</label>
                            <select
                                className="form-control"
                                id="tone"
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                            >
                                <option>Formal</option>
                                <option>Casual</option>
                                <option>Inspirational</option>
                                <option>Informative</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="wordCount">Number of Words</label>
                            <input
                                type="number"
                                className="form-control"
                                id="wordCount"
                                value={wordCount}
                                onChange={(e) => setWordCount(e.target.value)}
                                placeholder="Enter word count..."
                            />
                        </div>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleGenerateContent}
                        >
                            Generate Content
                        </button>
                    </form>
                </div>

                <div className="col-md-6 right-section d-flex flex-column justify-content-center">
                    <h2 className="text-center"><strong>GENERATED CONTENT</strong></h2>
                    <div className="content-display border p-3" id="contentDisplay">
                        <p>{generatedContent || 'Your generated content will appear here.'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
