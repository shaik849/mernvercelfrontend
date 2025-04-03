const Home = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gray-100 p-6">
        <h1 className="text-5xl font-bold text-gray-900">Welcome to My App</h1>
        <p className="text-lg text-gray-700 mt-4">
          This is a demo home page with some dummy information.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Feature 1</h2>
            <p className="text-gray-600 mt-2">
              This is a short description of the first feature.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800">Feature 2</h2>
            <p className="text-gray-600 mt-2">
              Another dummy feature description for testing.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Home;
  