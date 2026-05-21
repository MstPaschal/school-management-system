import {

  BrowserRouter,

  Routes,

  Route

} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";

import MainLayout from "./layouts/MainLayout";

import ProtectedRoute from "./routes/ProtectedRoute";

import CreateStudent from "./pages/CreateStudent";

import ViewStudents from "./pages/ViewStudents";

import EditStudent from "./pages/EditStudent";

import SetPayment from "./pages/SetPayment";

import AdminSettings from "./pages/AdminSettings";

import CreateSession from "./pages/CreateSession";

import CreateClass from "./pages/CreateClass";

import CreateSubject from "./pages/CreateSubject";

import CreateTeacher from "./pages/CreateTeacher";

import AssignSubject from "./pages/AssignSubject";

import EditTeacher from "./pages/EditTeacher";

import ScoreEntry from "./pages/ScoreEntry";

import CommentManager from "./pages/CommentManager";

import MakeComments from "./pages/MakeComments";

import ResultReport from "./pages/ResultReport";

import StudentStatus from "./pages/StudentStatus";

import StudentPromotion from "./pages/StudentPromotion";

import DocumentUpload from "./pages/DocumentUpload";

import ResultPins from "./pages/ResultPins";

import ResultChecker from "./pages/ResultChecker";

import ResultView from "./pages/ResultView";

import TeacherDashboard from "./pages/TeacherDashboard";

import CreateAdmin from "./pages/CreateAdmin";

import SuperAdminRoute from "./components/SuperAdminRoute";

import ForgotPassword from "./pages/ForgotPassword";

import ResetPassword from "./pages/ResetPassword";

import ChangePassword from "./pages/ChangePassword";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
        path="/dashboard"
        element={

        <ProtectedRoute>

        <MainLayout>

        <Dashboard />

        </MainLayout>

        </ProtectedRoute>

        }
        />

        <Route
        path="/students/create"
        element={

      <ProtectedRoute>

      <MainLayout>

        <CreateStudent />

      </MainLayout>

      </ProtectedRoute>

      }
      />

      <Route
  path="/students/view"
  element={

    <ProtectedRoute>

      <MainLayout>

        <ViewStudents />

      </MainLayout>

    </ProtectedRoute>

      }
    />


    <Route
  path="/students/edit/:id"
  element={

    <ProtectedRoute>

      <MainLayout>

        <EditStudent />

      </MainLayout>

    </ProtectedRoute>

    }
    />



    <Route
  path="/payments/set"
  element={

    <ProtectedRoute>

      <MainLayout>

        <SetPayment />

      </MainLayout>

    </ProtectedRoute>

    }
    />



    <Route
  path="/admin-settings"
  element={

    <ProtectedRoute>

      <MainLayout>

        <AdminSettings />

      </MainLayout>

    </ProtectedRoute>

  }
/>


    
    <Route
  path="/sessions"
  element={

    <ProtectedRoute>

      <MainLayout>

        <CreateSession />

      </MainLayout>

    </ProtectedRoute>

    }
    />


    <Route
  path="/classes"
  element={

    <ProtectedRoute>

      <MainLayout>

        <CreateClass />

      </MainLayout>

    </ProtectedRoute>

      }
    />


    <Route
  path="/subjects"
  element={

    <ProtectedRoute>

      <MainLayout>

        <CreateSubject />

      </MainLayout>

    </ProtectedRoute>

      }
    />


    <Route
  path="/teachers"
  element={

    <ProtectedRoute>

      <MainLayout>

        <CreateTeacher />

      </MainLayout>

    </ProtectedRoute>

      }
    />


    <Route
  path="/assign-subject"
  element={

    <ProtectedRoute>

      <MainLayout>

        <AssignSubject />

      </MainLayout>

    </ProtectedRoute>

    }
    />


    <Route
  path="/teachers/edit/:id"
  element={

    <ProtectedRoute>

      <MainLayout>

        <EditTeacher />

      </MainLayout>

    </ProtectedRoute>

      }
    />


    <Route
  path="/score-entry"
  element={

    <ProtectedRoute>

      <MainLayout>

        <ScoreEntry />

      </MainLayout>

    </ProtectedRoute>

  }
/>


<Route
  path="/comment-manager"
  element={
    <ProtectedRoute>

      <MainLayout>

        <CommentManager />

      </MainLayout>

    </ProtectedRoute>
  }
/>


<Route
  path="/make-comments"
  element={

    <ProtectedRoute>

      <MainLayout>

        <MakeComments />

      </MainLayout>

    </ProtectedRoute>

  }
/>


<Route
  path="/results"
  element={

    <ProtectedRoute>

      <MainLayout>

        <ResultReport />

      </MainLayout>

    </ProtectedRoute>

  }
/>


<Route
  path="/student-status"
  element={

    <ProtectedRoute>

      <MainLayout>

        <StudentStatus />

      </MainLayout>

    </ProtectedRoute>

  }
/>


<Route
  path="/student-promotion"
  element={

    <ProtectedRoute>

      <MainLayout>

        <StudentPromotion />

      </MainLayout>

    </ProtectedRoute>

  }
/>


<Route
  path="/documents"
  element={

    <ProtectedRoute>

      <MainLayout>

        <DocumentUpload />

      </MainLayout>

    </ProtectedRoute>

  }
/>


<Route
  path="/result-pins"
  element={

    <SuperAdminRoute>

      <MainLayout>

        <ResultPins />

      </MainLayout>

    </SuperAdminRoute>

  }
/>


<Route
  path="/teacher-dashboard"
  element={

    <ProtectedRoute>

      <MainLayout>

        <TeacherDashboard />
      
      </MainLayout>
      
    </ProtectedRoute>
    
  }
/>


<Route
  path="/result-checker"
  element={<ResultChecker />}
/>


<Route
  path="/result-view"
  element={<ResultView />}
/>


<Route
  path="/create-admin"
  element={

    <SuperAdminRoute>

      <MainLayout>

        <CreateAdmin />

      </MainLayout>

    </SuperAdminRoute>

  }
/>


<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>


      </Routes>

    </BrowserRouter>

  );

}

export default App;