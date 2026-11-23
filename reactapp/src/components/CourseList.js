// import React, { useEffect, useState } from "react";

// const BASE_URL = "http://localhost:8080/api/courses";

// const CourseList = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [activeOnly, setActiveOnly] = useState(false);

//   const fetchCourses = async (active = false) => {
//     setLoading(true);
//     setError("");

//     try {
//       const url = active
//         ? `${BASE_URL}?active=true`
//         : BASE_URL;

//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch courses: ${response.status}`
//         );
//       }

//       const data = await response.json();

//       setCourses(Array.isArray(data) ? data : []);
//     } catch (err) {
//       // Store the actual error message.
//       // This allows the test to find "fetchfail".
//       setError(err?.message || String(err));
//       setCourses([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCourses(activeOnly);
//   }, [activeOnly]);

//   const handleFilterToggle = () => {
//     setActiveOnly((previous) => !previous);
//   };

//   // Loading state
//   if (loading) {
//     return (
//       <div>
//         <p data-testid="loading">Loading courses...</p>
//       </div>
//     );
//   }



//   // Error state
//   if (error) {
//     return (
//       <div>
//         <p data-testid="error">[Error - You need to specify the message]</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <h2>Course List</h2>

//       <button
//         type="button"
//         data-testid="active-filter"
//         onClick={handleFilterToggle}
//       >
//         {activeOnly ? "Show All Courses" : "Show Active Courses"}
//       </button>

//       {/* Empty state */}
//       {courses.length === 0 ? (
//         <p data-testid="empty">No courses available.</p>
//       ) : (
//         <div>
//           {courses.map((course) => (
//             <div
//               key={course.courseId}
//               data-testid={`course-card-${course.courseId}`}
//             >
//               <h3>{course.title}</h3>

//               <p>{course.description}</p>

//               <p>
//                 <strong>Duration:</strong> {course.duration}
//               </p>

//               <p>
//                 <strong>Level:</strong> {course.level}
//               </p>

//               <p>
//                 <strong>Price:</strong> {course.price}
//               </p>

//               <p>
//                 <strong>Status:</strong>{" "}
//                 {course.isActive ? "Active" : "Inactive"}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseList;

import React, { useEffect, useState } from "react";
const BASE_URL = "http://localhost:8080/api/courses";
function CourseList() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);
  useEffect(() => {
    let mounted = true;
    const loadCourses = async () => {
      setLoading(true);
      setError("");
      try {
        const url = activeOnly
          ? `${BASE_URL}?active=true`
          : BASE_URL;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch courses: ${response.status}`
          );
        }
        const data = await response.json();
        if (mounted) {
          setCourses(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (mounted) {
          setCourses([]);
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError(String(err));
          }
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    loadCourses();
    return () => {
      mounted = false;
    };
  }, [activeOnly]);

  const handleFilterToggle = () => {
    setActiveOnly((current) => !current);
  };

  if (loading) {
    return (
      <div>
        <p data-testid="loading">Loading courses...</p>
      </div>
    );
  }

  if (error !== "") {
    return (
      <div>
        <p data-testid="error">{error}</p>
      </div>
    );
  }

    return (
    <div>
      <h2>Course List</h2>

      <button
        type="button"
        data-testid="active-filter"
        onClick={handleFilterToggle}
      >
        {activeOnly ? "Show All Courses" : "Show Active Courses"}
      </button>

      {courses.length === 0 ? (
        <p data-testid="empty">No courses available.</p>
      ) : (
        <div>
          {courses.map((course) => (
            <div
              key={course.courseId}
              data-testid={`course-card-${course.courseId}`}
            >
              <h3>{course.title}</h3>

              <p>{course.description}</p>

              <p>
                <strong>Duration:</strong> {course.duration}
              </p>

              <p>
                <strong>Level:</strong> {course.level}
              </p>

              <p>
                <strong>Price:</strong> {course.price}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {course.isActive ? "Active" : "Inactive"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseList;