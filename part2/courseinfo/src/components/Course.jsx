const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => {
  // console.log("Part", part);
return (
  <p>
    {part.name} {part.exercises}
  </p>
)}

const Content = ({ parts }) => {
  // console.log("Parts", parts);
  return (
  <>
  {parts.map((part) => <Part part={part} key={part.id}/>)}
  </>
  )
}


const Course = ({ course }) => {
  // console.log("Course", course);
  const total = course.parts.reduce((x, element) => (x + element.exercises), 0);
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>
    </>
  );
}


export default Course;