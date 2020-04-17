import React, { useState, useEffect } from "react";
import api from '../src/services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    async function handleFetchRepo(){
      const response = await api.get('/repositories');

      setRepositories(response.data);
    }

    handleFetchRepo();
  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: 'Novo projeto',
      url: 'http://github.com/novas-oportunidades',
      techs: ['React', 'React Native', 'Node']
    });

    const repo = response.data;

    setRepositories([ ...repositories, repo ]);
  }

  async function handleRemoveRepository(id) {
    const repoAux = [...repositories];
    const response = await api.delete(`/repositories/${id}`, {
      title: 'Novo projeto',
      url: 'http://github.com/novas-oportunidades',
      techs: ['React', 'React Native', 'Node']
    });

    if(response.status === 204){
      const repoIndex = repoAux.findIndex(repo => repo.id === id);
      repoAux.splice(repoIndex, 1);
      setRepositories(repoAux);
    } else {
      return false;
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repo => {
          return ( 
            <li key={repo.id}>
              <div><span>Nome do repositório:</span> <b>{repo.title}</b></div>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          )})}
      </ul>

      <button className="btn-add" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
