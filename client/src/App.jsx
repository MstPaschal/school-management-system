import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import ApplyNow from "./pages/ApplyNow";
import Login from "./pages/Login";

import StudentPortal from "./pages/StudentPortal";
import StudentResults from "./pages/StudentResults";
import StudentResultView from "./pages/StudentResultView";

import Dashboard from "./pages/Dashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import SuperAdminRoute from "./components/SuperAdminRoute";

import CreateStudent from "./pages/CreateStudent";
import ViewStudents from "./pages/ViewStudents";
import StudentCredentials from "./pages/StudentCredentials";
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

import CreateAdmin from "./pages/CreateAdmin";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

import AdmissionRequests from "./pages/AdmissionRequests";
import ManageEvents from "./pages/ManageEvents";
import EventPreview from "./pages/EventPreview";

import NotFound from "./pages/NotFound";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* =========================
            PUBLIC WEBSITE
        ========================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/portal"
          element={<Login />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/events"
          element={<Events />}
        />

        <Route
          path="/events/:id"
          element={<EventPreview />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/apply"
          element={<ApplyNow />}
        />

        {/* =========================
            STUDENT ROUTES
        ========================= */}

        <Route
          path="/student-portal"
          element={

            <ProtectedRoute
              allowedRoles={["student"]}
            >

              <StudentPortal />

            </ProtectedRoute>

          }
        />

        <Route
          path="/student-results"
          element={

            <ProtectedRoute
              allowedRoles={["student"]}
            >

              <StudentResults />

            </ProtectedRoute>

          }
        />

        <Route
          path="/student-results/:accessId"
          element={

            <ProtectedRoute
              allowedRoles={["student"]}
            >

              <StudentResultView />

            </ProtectedRoute>

          }
        />

        {/* =========================
            ADMIN DASHBOARD
        ========================= */}

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <Dashboard />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            STUDENT MANAGEMENT
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/students/create"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <CreateStudent />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/students/view"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <ViewStudents />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/students/credentials"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <StudentCredentials />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/students/edit/:id"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <EditStudent />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            PAYMENTS
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/payments/set"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <SetPayment />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/admin-settings"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <AdminSettings />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            ACADEMIC SETUP
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/sessions"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <CreateSession />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/classes"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <CreateClass />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/subjects"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <CreateSubject />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            TEACHER MANAGEMENT
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/teachers"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <CreateTeacher />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/assign-subject"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <AssignSubject />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/teachers/edit/:id"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <EditTeacher />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            TEACHING / RESULT ROUTES
            TEACHER + ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/score-entry"
          element={

            <ProtectedRoute
              allowedRoles={[
                "teacher",
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <ScoreEntry />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/comment-manager"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <CommentManager />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/make-comments"
          element={

            <ProtectedRoute
              allowedRoles={[
                "teacher",
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <MakeComments />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/results"
          element={

            <ProtectedRoute
              allowedRoles={[
                "teacher",
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <ResultReport />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            STUDENT ADMINISTRATION
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/student-status"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <StudentStatus />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        <Route
          path="/student-promotion"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <StudentPromotion />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            DOCUMENTS
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/documents"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <DocumentUpload />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            SUPERADMIN ONLY
        ========================= */}

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
          path="/create-admin"
          element={

            <SuperAdminRoute>

              <MainLayout>

                <CreateAdmin />

              </MainLayout>

            </SuperAdminRoute>

          }
        />

        {/* =========================
            TEACHER DASHBOARD
        ========================= */}

        <Route
          path="/teacher-dashboard"
          element={

            <ProtectedRoute
              allowedRoles={["teacher"]}
            >

              <MainLayout>

                <TeacherDashboard />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            PUBLIC RESULT CHECKER
        ========================= */}

        <Route
          path="/result-checker"
          element={<ResultChecker />}
        />

        <Route
          path="/result-view"
          element={<ResultView />}
        />

        {/* =========================
            ADMISSIONS
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/admission-requests"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <AdmissionRequests />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            EVENTS MANAGEMENT
            ADMIN + SUPERADMIN
        ========================= */}

        <Route
          path="/manage-events"
          element={

            <ProtectedRoute
              allowedRoles={[
                "admin",
                "superadmin"
              ]}
            >

              <MainLayout>

                <ManageEvents />

              </MainLayout>

            </ProtectedRoute>

          }
        />

        {/* =========================
            PASSWORD ROUTES
        ========================= */}

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

        <Route 
          path="*" 
          element={<NotFound />} 
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;