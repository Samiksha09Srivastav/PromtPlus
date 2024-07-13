import Feed from "@components/Feed";


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br/>
        <span className="orange_gradient text-center">
          AI Powered Prompts
        </span>
      </h1>
      <p className='decs text-center'>
        PromptPulse is a open-source AI prompting tool for modern world to share creative prompt. 
      </p>

      <Feed/>
    </section>
  );
} 

export default Home;
