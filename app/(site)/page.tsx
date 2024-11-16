import React from 'react';
import MainContent from './components/MainContent';
import Sidebar from './components/Sidebar';

const Page = () => {
    return (
        <div className="flex contain">
            <Sidebar/>
            <MainContent />
        </div>
    );
};

export default Page;