import { useState } from "react";

const App = () => {
  const [left, setLeft] =  useState("1");
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const Header = (props) => {
      return (
        <>
          <h1>{props.course.name}</h1>
        </>
      )
    };

    const Part = (props) => {
      return (
        <>
          <p>{props.part.name} {props.part.exercises}</p>
        </>
      )
    }

  const Content = (props) => {
      return (
        <>
          {props.parts.map((part, key) => <Part key={key} part={part} />)}
        </>
      )
    }

  const Total = (props) => {
      const total = props.parts.reduce((sum, { exercises }) => exercises + sum, 0);
      return (
        <>
          <p>Number of exercises {total}</p>
        </>
      )
    }
    debugger
  return(
    <>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      
    </>
  )
}

export default App