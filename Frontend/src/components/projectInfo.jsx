import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {marked} from 'marked';

const ProjectInfo = () => {
  const { id } = useParams();
  const location = useLocation();
  const { gitUrl } = location.state || {};
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!gitUrl) {
      setError('No GitHub URL provided');
      setLoading(false);
      return;
    }

    // Extract owner and repo name from the gitUrl
    const urlParts = gitUrl.split('/');
    const owner = urlParts[urlParts.length - 2]; // Second to last part is the owner
    const repoName = urlParts[urlParts.length - 1]; // Last part is the repo name

    const fetchReadme = async () => {
      try {
        const response = await fetch(`https://raw.githubusercontent.com/${owner}/${repoName}/master/README.md`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch README');
        }

        const markdown = await response.text();
        const html = marked(markdown);
        setHtmlContent(html);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReadme();
  }, [gitUrl]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Project README</h1>
      <div
        className="bg-gray-100 p-4 rounded-lg border border-gray-300"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </div>
  );
};

export default ProjectInfo;
