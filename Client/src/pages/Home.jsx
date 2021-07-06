import TodoList from '../components/TodoList.jsx';
import React from 'react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

export const Home = () => {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className='todo-app'>
        <TodoList />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}