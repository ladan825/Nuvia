// src/components/EditProject.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function EditProject() {
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Fetch current project data
  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setTitle(data.title);
        setContent(data.content);
      }
    };
    fetchProject();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('projects')
      .update({ title, content })
      .eq('id', id);

    if (!error) {
      navigate('/dashboard'); // Go back to dashboard after save
    }
  };

  return (
    <div className="p-8 mt-20 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input 
          className="w-full p-2 border rounded" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <textarea 
          className="w-full p-2 border rounded h-40" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save Changes</button>
      </form>
    </div>
  );
}