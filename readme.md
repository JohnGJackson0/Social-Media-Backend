# Main Objectives

* Develop an API for a Social Media platform in Node, MongoDB & Mongoose
* Front end: React Native Web with Server Side Rendering (SSR)

## Standards

* Conventional Commits- fix:msg, feat:msg, chore:msg, docs:msg, style:msg, refactor:msg, test:msg, BREAKING CHANGE:msg
* Static testing: ESLINT, TYPESCRIPT
* Unit testing: Jest, E2E: Cypress
* Trunk based branching strategy
* Architecture: Backend: MVC, React-Native-Web: PUSH based with Reactive (RxJS), redux
* Paradigm: functional prefered / no class based components 

## High Level Backend Implementation

* CRUD Tables : User, Posts, Communities
* querys with main CRUD Deps :
Discover: Posts
Post: Posts
Comments: Posts
Search: Discover
Community Page: Posts

## High Level Frontend Epics  

New User always routes to login
On login > Show Discover
On Discover > Posts
On Discover > Settings
On Discover > Community page
TBD