import { useEffect} from "react";
import { useForm } from "react-hook-form";
import api from "../api";

export default function Home() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const res = {
      data: {
        word: 'abc',
        translate: 'abc',
      }
    }
    try {
      const response = await api.post('words', res)

      console.log(response.data)
    } catch (error) {

    }
  }

  const fetchWords = async () => {
    try {
      const response = api.get('words')
      console.log(response.data, 'Words')
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchWords()
  }, [])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className="flex justify-center items-center flex-col mt-6">
        <h1 className="mb-1">Digite aqui a palavra e o significado que você aprendeu</h1>
        <input
          className="border mb-3"
          {...register("word", { required: true })}
        />
        {errors.word && <span>This field is required</span>}

        <input
          className="border mb-3"
          {...register("translate", { required: true })}
        />
        {errors.translate && <span>This field is required</span>}

        <button type="submit" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          <span>Enviar</span>
        </button>
      </div>
    </form>
  )
}