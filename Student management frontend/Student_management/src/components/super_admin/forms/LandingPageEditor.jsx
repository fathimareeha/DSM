import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

export default function LandingPageEditor() {
     const [id, setId] = useState(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/superadmin_app/landing-page-content/1/`)
            .then(res => {
                if (res.data) {
                    setTitle(res.data.title);
                    setContent(res.data.content || '');
                }
            });
    }, []);

    const saveContent = () => {
        axios.put(`http://127.0.0.1:8000/superadmin_app/landing-page-content/1/`, { title, content })
            .then(() => alert('Content saved!'))
            .catch(() => alert('Error saving content'));
    };

    return (
        <div style={{ padding: '20px' }}>
            <input 
                type="text" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="Landing Page Title" 
                style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
            />
            <CKEditor
                editor={ClassicEditor}
                data={content}
                onChange={(event, editor) => setContent(editor.getData())}
            />
            <button onClick={saveContent} style={{ marginTop: '10px', padding: '8px 16px' }}>
                Save
            </button>
        </div>
    );
}
