import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { FaSadTear } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { ToastContainer, toast } from 'react-toastify';

import api from "../api";

export default function Home() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [words, setWords] = useState([])

  const handleDelte = async (id) => {
    try {
      const response = await api.delete(`words/${id}`)
      if (response.status === 200 || response.status === 201) {
        toast.success('Palavra excluída com sucesso.')
        fetchWords()
        reset()
      }
    } catch (error) {
      toast.error('Algo deu errado na exclusão. Contate o suporte')
    }
  }

  const onSubmit = async (data) => {
    const res = {
      data: {
        word: data.word,
        translate: data.translate,
      }
    }
    try {
      const response = await api.post('words', res)
      if (response.status === 200 || response.status === 201) {
        toast.success('Palavra salva com sucesso')
        fetchWords()
        reset()
      }
    } catch (error) {
      toast.error('Erro desconhecido')
      reset()
    }
  }

  const fetchWords = async () => {
    try {
      const response = await api.get('words')
      setWords(response.data)
    } catch (error) {
      toast.error('Aconteceu um erro inexperado. Contate o suporte.')
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])

  return (
    <div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className="flex justify-center items-center flex-col mt-6">
          <h1 className="mb-1 font-medium	text-lg	">Type the word and its meaning here</h1>
          <input
            placeholder="Type the word"
            className="border mb-3 w-96 p-2 rounded-md"
            {...register("word", { required: true })}
          />
          {errors.word && <span>This field is required</span>}

          <input
            placeholder="Type the translation"
            className="border mb-3 w-96 p-2 rounded-md"
            {...register("translate", { required: true })}
          />
          {errors.translate && <span>This field is required</span>}

          <button type="submit" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <span>Enviar</span>
          </button>
        </div>
      </form>
      <div
        className="flex justify-center items-center flex-col mt-6">
        {words?.data?.length ? words?.data?.map(word => (
          <div
            className="flex justify-between p-4 items-center mt-6 border border-r-8 border-green-800 rounded-md w-96"
            key={word.id}>
            <div className="flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <h1 className='text-lg'>{word.attributes.word}</h1>
                </div>
                <div className="flip-card-back">
                  <h1 className='text-lg'>{word.attributes.translate}</h1>
                </div>
              </div>
            </div>
            <button type='button' onClick={() => handleDelte(word.id)}>
              <AiFillDelete size={20} color={'#173a0c'} />
            </button>
          </div>
        )) : (
          <>
            <h1 className='mb-4'>Não há nenhuma palavra cadastrada.</h1>
            <FaSadTear size={24} color={'green'} />
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}