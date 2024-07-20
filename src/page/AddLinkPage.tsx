import React from 'react';

const AddLinkPage: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">링크 추가 페이지</h1>
      <form>
        {/* 링크 추가 폼 */}
        <div className="mb-4">
          <label
            htmlFor="linkName"
            className="block text-sm font-medium text-gray-700"
          >
            링크 이름
          </label>
          <input
            type="text"
            id="linkName"
            name="linkName"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="linkUrl"
            className="block text-sm font-medium text-gray-700"
          >
            링크 URL
          </label>
          <input
            type="url"
            id="linkUrl"
            name="linkUrl"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          추가
        </button>
      </form>
    </div>
  );
};

export default AddLinkPage;
