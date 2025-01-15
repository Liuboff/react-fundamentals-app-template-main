const url = "http://localhost:4000/";

export const createUser = async (data) => {
  const registerUrl = `${url}register`;
  const response = await fetch(registerUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Server error: ", errorData);
    throw new Error(errorData.message || "Network Error");
  }

  return await response.json();
};

export const login = async (data) => {
  // write your code here
  const loginUrl = `${url}login`;
  const response = await fetch(loginUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
};

export const getCourses = async () => {
  const coursesUrl = `${url}courses/all`;
  const response = await fetch(coursesUrl, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  if (!response.ok) {
    console.error(
      `Error fetching courses: ${response.status} - ${response.statusText}`
    );
    return [];
  }

  return await response.json(); // є сенс лише всередині трай блоку
};

export const getAuthors = async () => {
  const authorsUrl = `${url}authors/all`;
  const response = await fetch(authorsUrl, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });
  return await response.json();
};

export const getCurrentUser = async () => {
  // write your code here
  const myUrl = `${url}users/me`;
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Token is not available in localStorage");
  }

  try {
    const response = await fetch(myUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};

// export const updateCourseService = async () => {
//   // write your code here
//   return await response.json();
// };

export const logout = async () => {
  // write your code here
  const logoutUrl = `${url}/logout`;
  const token = localStorage.getItem("token");

  const response = await fetch(logoutUrl, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return await response.json();
};

// export const deleteCourseService = async () => {
//   // write your code here
//   return await response.json();
// };

export const createCourse = async (course) => {
  const createCourseUrl = `${url}courses/add`;
  const response = await fetch(createCourseUrl, {
    method: "POST",
    body: JSON.stringify(course),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // write your code here
  return await response.json();
};

export const createAuthor = async (name) => {
  // write your code here
  const createAuthorUrl = `${url}authors/add`;
  const response = await fetch(createAuthorUrl, {
    method: "POST",
    body: JSON.stringify({ name }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network Error");
  }
  return await response.json();
};
