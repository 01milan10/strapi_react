import React from 'react';
import TodoForm from './TodoForm';
import Todos from './Todos';

export default function Home() {
  return (
    <>
      <TodoForm />
      <Todos />
    </>
  );
}
