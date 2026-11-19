# Southern Cross Learning

Southern Cross Learning is a full-stack learning management system. Students can browse courses and manage enrollments, teachers can publish and maintain their courses, and administrators can manage course access and user roles.

## How it works

- `frontend/` is a React application built with Vite. It calls the Django API at `VITE_API_URL`.
- `backend/` is a Django REST Framework API using SQLite, JWT authentication, and a custom user model with student, teacher, and admin roles.
- Course ownership and enrollment permissions are enforced by the API, not by frontend controls.
- The database file is created at `backend/db.sqlite3` when migrations are applied.

The design references are [core/logic basic.JPG](core/logic%20basic.JPG) and [core/baseline layout concept.txt](core/baseline%20layout%20concept.txt).

## Run locally

### Backend

From the project root in PowerShell:

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

The superuser is assigned the admin role. The API is available at `http://127.0.0.1:8000/api/`. Local development defaults are in `backend/config/settings.py`; `backend/.env.example` lists supported environment variables for overrides. Django does not load that example file automatically.

### Frontend

In a second PowerShell window:

```powershell
cd frontend
Copy-Item .env.example .env.local
npm install
npm run start
```

The frontend opens at `http://localhost:5173`. The example `VITE_API_URL` points to the local backend. Restart Vite after changing the value.

## API overview

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/register/` | Register a student account |
| `POST` | `/api/auth/token/` | Obtain JWT access and refresh tokens |
| `GET` | `/api/auth/me/` | Get the authenticated user's profile |
| `GET`, `POST` | `/api/courses/` | Browse courses; teachers/admins can create |
| `GET`, `PATCH`, `DELETE` | `/api/courses/{id}/` | Read or manage a course |
| `POST`, `DELETE` | `/api/courses/{id}/enroll/`, `/unenroll/` | Enroll in or leave a course |
| `GET` | `/api/enrollments/` | List the authenticated student's enrollments |
| `GET` | `/api/admin/users/` | Admin-only user list |
| `PATCH` | `/api/admin/users/{id}/role/` | Admin-only student/teacher role update |

Course catalog reads are public. Course writes are restricted to the course owner or an admin; enrollment actions are student-only. API authentication uses the JWT access token in the `Authorization: Bearer <token>` header.

## Tests and build

From `backend/`, run the Django API tests:

```powershell
python manage.py test
```

From `frontend/`, run the React component tests and production build:

```powershell
npm test
npm run build
```

## Deployment

The project is configured for local development and has not yet been deployed. Before deployment, configure a strong `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=false`, `DJANGO_ALLOWED_HOSTS`, and `CORS_ALLOWED_ORIGINS` for the production domains.
