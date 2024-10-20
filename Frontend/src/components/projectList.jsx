import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { host } from '../routes';
import axios from 'axios'

const ProjectList = () => {
  const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
  const handleProjectClick = (id, gitUrl) => {
    
    navigate(`/projectInfo/${id}`, { state: { gitUrl: gitUrl } });
  };
  useEffect(() => {
    const foo = async () =>{
        const response=await axios.get(`${host}/project/getOpenProjects`);
        console.log("hey");
        console.log(response);
        setProjects(response.data);
    }
    foo();
    
  },[] )
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Projects</h1>
      <ul className="space-y-4">
        {projects?.map((project) => (
          <li
            key={project._id}
            className={`p-4 rounded-lg shadow-md cursor-pointer ${
              project.isApplicationOpen ? 'bg-white' : 'bg-red-500 text-white'
            }`}
            onClick={() => handleProjectClick(project._id, project.gitUrl)}
          >
            <h2 className="font-bold text-lg">{project.title}</h2>
            <p className="text-sm">
              <span className="font-bold">Tech Stack:</span> {project.techStack.join(', ')}
            </p>
            <CollapsibleDescription description={project.description} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const CollapsibleDescription = ({ description }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        className="mt-2 text-blue-500 font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Hide Description' : 'Show Description'}
      </button>
      {isOpen && (
        <div className="mt-2 p-2 border border-gray-300 rounded bg-gray-100">
          <pre className="whitespace-pre-wrap">{description}</pre>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
