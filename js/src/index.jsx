import React from 'react';
import ReactDOM from 'react-dom';

/* Import Components */
import FaqList from "./components/FaqList";

const Main = () => (
    <FaqList />
);

ReactDOM.render(<Main/>, document.getElementById('faq-search-app'));