import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { preview } from '../assets';
import { getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setform] = useState({
    name: '',
    prompt: '',
    photo: '',
  });
  const [generatingImg, setGeneratingImg] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const handleSubmit = () => {

  }
  const handleChange = (e) => {

  }
  const handleSurpriseMe = () => {

  }
  return (
    <section className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-bold text-[#000000] text-[32px]' >
         Create
         <p className='mt-2 text-[#63717e] text-[14px] max-w-[100vw] '>
          Create your new realm of creation with DALL-E AI. The perfect magic to turn your creativity into reality.
         </p>
        </h1>
      </div>
      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className='flex flex-col gap-5'>
          <FormField 
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="i.e, Mr Saadan"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField 
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="i.e, A man walking besides an empty road. "
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
        <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute insert-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  )
}

export default CreatePost


