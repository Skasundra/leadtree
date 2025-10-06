export const TestTailwind = () => {
  return (
    <div className="p-8 bg-blue-500 text-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4">TailwindCSS Test</h1>
      <p className="text-lg">If you can see this styled properly, TailwindCSS is working!</p>
      <button className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 rounded transition-colors">
        Test Button
      </button>
    </div>
  );
};