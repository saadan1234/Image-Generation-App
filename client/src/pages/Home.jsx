import React, {useState, useEffect} from 'react'
import { Loader, Card, FormField } from '../components';

const RenderCards = ({data, title}) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className="mt-5 font-bold text-[#acaab3] text-xl uppercase">
      {title}
    </h2>
  )
}

const Home = () => {
  const [ loading, setLoading ] = useState(false);
  const [ allPosts, setAllPosts ] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchedResults, setSearchedResults] = useState(null);
  const [searchTimeout, setsearchTimeout] = useState(null);

  useEffect( () => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type' : 'application/json',
          },
        
        });

        if(response.ok){
          const result = await response.json();
          setAllPosts(result.data.reverse());
        }
      } catch (error) {
        alert(error);
      }finally{
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    setsearchTimeout (
      setTimeout(()=> {
        const searchResults = allPosts.filter((item) => item.name.toLowerCase().includes(searchText.toLowerCase()) || item.prompt.toLowerCase().includes(searchText.toLowerCase()));
        setSearchedResults(searchResults);
      }, 500)
    );
  }

  return (
    <section className='max-w-7xl mx-auto '>
      <div>
        <h1 className='font-bold text-[#000000] text-[32px]' ></h1>
         The Community Showcase
         <p className='mt-2 text-[#63717e] text-[14px] max-w-[100vw]'>
          Browse through a new realm of creation with DALL-E AI. The perfect magic to turn your creativity into reality.
         </p>
        
      </div>
      <div className='mt-16'>
        <FormField 
        labelName="Search Post" 
        type="text"
        name = "text"
        placeholder="Search posts"
        value = {searchText}
        handleChange={handleSearchChange}
        />
      </div>
      <div className='mt-10'>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Loader />
          </div>

        ): (
          <>
          {searchText && (
            <h2 className='font-medium text-[#63717e] text-xl mb-3'>
              Showing results for <span className='text-[#000000] '>
                {searchText}
              </span>
            </h2>
          )}
          <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3'>
            {searchText ?  (
              <RenderCards
              data={searchedResults}
              title="No search results found"
              />
            ) : (
              <>
              <RenderCards 
              data={allPosts}
              title="No posts found"
              />
              </>
            ) }
          </div>
          </>
        )}
      </div>
    </section>
    
  )
}

export default Home;