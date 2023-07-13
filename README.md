# Contact Management System - Frontend
This is the frontend component of the [Contact Management System](https://github.com/contact-mgmt-sys). It communicates with the [backend](https://github.com/contact-mgmt-sys/contact-mgmt-sys-be) API to manage contacts.

## Technologies
* [Vue.js](https://vuejs.org/)
* [Fomantic-UI](https://fomantic-ui.com/)

## Requirements
### Required
* [Node.js](https://nodejs.org/en)
### Optional
* [Git](https://git-scm.com/downloads)
* [Docker](https://www.docker.com/products/docker-desktop/)

## Setup
1. Download and extract the repository or clone it if [git is present](#optional).
```
git clone https://github.com/contact-mgmt-sys/contact-mgmt-sys-fe.git
```
2. Install dependencies.
```
npm install
```
3. Create an `.env` file in the root directory and add the following environment variables. The following values are examples and should be changed to match your environment.
```env
VITE_API_BASE=http://127.0.0.1:8000/
VITE_API_CONTACTS_LIST=http://127.0.0.1:8000/contacts/
VITE_API_CONTACTS_VIEW=http://127.0.0.1:8000/contacts/:id/
```

## Usage
* Starting the development server.
```
npm run dev
```
* Building the project.
```
npm run build
```
* Previewing the production build.
```
npm run preview
```

## Docker
1. Build the image.
```
docker build -t contact-mgmt-sys-fe .
```
2. Run the container.
```
docker run -p 8080:8080 --name contact-mgmt-sys-fe --env-file .env --rm contact-mgmt-sys-fe
```

## References
* [Docker Hub Image](https://hub.docker.com/r/noamolatfs/contact-mgmt-sys-fe)