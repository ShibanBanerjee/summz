import { useState, useEffect } from 'react';
import { copy, linkIcon, loader, tick } from '../assets';
import { useLazyGetSummaryQuery } from '../services/article.js';

const Demo = () => {
  const [article, setArticle] = useState({
    url: '',
    summary: '',
  });

  const [allArtciles, setAllArtciles] = useState([]);
  const [copied, setCopied] = useState("");

  const [getSummary, { isFetching, isError }] = useLazyGetSummaryQuery();

  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem('articles')
    );

    if (articlesFromLocalStorage) {
      setAllArtciles(articlesFromLocalStorage);
    }
  
  }, [])
  

  const handleSubmit = async (e) => {

    e.preventDefault();

    const {data} = await getSummary({ articleUrl: article.url });

    if(data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArtciles];

      setArticle(newArticle);
      setAllArtciles(updatedAllArticles);

      localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
    }
  }

  const handleCopy = (copyUrl) => {
    setCopied(copyUrl);
    navigator.clipboard.writeText(copyUrl);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  }

  return (
    <section className='w-full mt-16 max-w-xl'>
      {/* Search bar */}
      <div className='flex-col w-full gap-2'>
        <form 
          className='flex relative items-center justify-center' 
          onSubmit={handleSubmit}
        >
          <img 
            src={linkIcon}
            alt='link icon'
            className='absolute left-0 my-2 ml-3 w-5'
          /> 
          <input 
            type='url'
            placeholder='Enter a URL to summarize'
            value={article.url}
            onChange={(e) => 
              setArticle({ ...article, url: e.target.value })}
            required
            className='url_input peer'
          />
          <button
            type='submit'
            className='submit_btn
             peer-focus:border-gray-700 
             peer-focus:text-gray-700'
          >
            ⏎
          </button>
        </form>
        {/* Browse URL History */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto mt-1'>
          {allArtciles.map((article, index) => (
            <div
              key={`link-${index}`}
              onClick={() => setArticle(article)}
              className='link_card'
            >
              <div className='copy_btn' onClick={() => handleCopy(article.url)}>
                <img 
                src={copied === article.url ? tick : copy} 
                alt='copy_icon'
                className='w-{40%} h-{40%} object-contain'
                 />
              </div>
              <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                {article.url}
              </p>
            </div>
          ))}
          </div>
      </div>

      {/* Results */}
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-20 h-20 object-contain' />
        ) : isError ? (
          <p className='text-black font-inter text-sm font-bold'>
            Well! That wasnt supposed to happen... 
            <br />
            <span className='font-satoshi font-normal text-gray-700'>
              {isError?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <p className='text-black font-satoshi text-xl font-bold'>
                Article <span className='blue_gradient text-xl'>
                  Summary
                </span>
              </p>
              <div className='summary_box'>
                <p className='font-inter font-medium text-sm text-gray-700' >
                {article.summary}
                </p>
              </div>
            </div>
          )
        )}
      </div>

    </section>
  )
}

export default Demo;