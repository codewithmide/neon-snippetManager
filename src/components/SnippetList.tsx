import React from 'react';

const SnippetList = ({ snippets }: { snippets: any}) => {
  return (
    <table className="w-fit text-sm text-left rtl:text-right text-gray">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">Title</th>
          <th scope="col" className="px-6 py-3">Code Snippet</th>
        </tr>
      </thead>
      <tbody>
        {snippets.map((snippet: any) => (
          <tr key={snippet.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <td className="px-6 py-4 text-sm">{snippet.title}</td>
            <td className="px-6 py-4 text-sm">
              <pre className='whitespace-pre-wrap'>{snippet.snippet}</pre>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SnippetList;
