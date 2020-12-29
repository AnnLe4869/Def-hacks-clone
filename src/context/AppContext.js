import React from "react";

export default React.createContext({
  user: null,
  loading: false,
  alert: {
    type: "success",
    message: "",
  },
  userProgress: [],
  lastLesson: "",
  courses: [],
  lessons: [],
  initializeUserData: () => {},
  initializeCourses: () => {},

  setLoading: () => {},
  startLesson: () => {},
  completeLesson: () => {},
  setAlert: () => {},
});
