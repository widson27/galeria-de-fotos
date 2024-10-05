import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [fotos, setFotos] = useState([]); // Inicializando fotos como array vazio
  const apiKey = "R7HgXT1PciaJqubFkcgHnLtd0f0JSx3VYjCiut2ObrbmuRF2ze5xgLAy";

  // Modifique a palavra-chave aqui para ajustar a busca
  const url = 'https://api.pexels.com/v1/search?query=nature&per_page=20&page=1';

  useEffect(() => {
    // Fazendo a requisição para a API da Pexels
    fetch(url, {
      headers: {
        Authorization: apiKey,
      },
    })
      .then(response => response.json())
      .then(data => {
        setFotos(data.photos); // Atualizando o estado com as fotos da API 
      })
      .catch(erro => console.error(erro));
  }, []); // Executa apenas uma vez quando o componente é montado

  const inputLink = useRef();
  const inputTitle = useRef();

  function addFoto() {
    const newId = fotos.length ? fotos[fotos.length - 1].id + 1 : 1;
    const newFoto = {
      id: newId,
      img: inputLink.current.value,
      title: inputTitle.current.value,
    };
    setFotos([...fotos, newFoto]); // Adiciona a nova foto ao array de fotos
  }

  return (
    <div className='w-full h-full bg-cyan-700 flex flex-col justify-start p-10 gap-4 items-center' >
      <h1 className='text-5xl text-white text-center'>Galeria de Fotos</h1>
      <div className='w-full bg-slate-300 my-4 flex flex-wrap gap-4 p-4  rounded-md justify-center'>
        {fotos.map((foto) => (
          <div key={foto.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
            <img src={foto.src.medium} alt={foto.alt} className='w-full h-[200px] object-cover' />
            <h2 className='p-2 text-center'>{foto.alt || 'Sem Título'}</h2>
          </div>
        ))}
      </div>
      {
        /* renderiza o componente que adiciona fotos
          <div className='w-[800px] flex justify-center bg-slate-300 rounded-md'>
          <div className='w-[600px] flex flex-col py-6 items-center gap-4'>
            <h3 className='w-[600px] text-left text-3xl text-slate-800'>URL da imagem:</h3>
            <input type="text" placeholder='Digite a URL da imagem' className='w-[100%] h-[50px] rounded-md outline-none px-2' ref={inputLink} />
            <h3 className='w-[600px] text-left text-3xl text-slate-800'>Título da imagem:</h3>
            <input type="text" placeholder='Digite o título da imagem' className='w-[100%] mb-4 h-[50px] rounded-md outline-none px-2' ref={inputTitle} />
            <button className='w-[180px] h-[50px] text-2xl text-white border-none rounded-md bg-cyan-500 p-2' onClick={addFoto}>
              Adicionar Foto
            </button>
          </div>
        </div>
        */
      }
    </div>
  );
}

export default App;
