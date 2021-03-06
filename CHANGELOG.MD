# CHANGELOG

## Current

- Delete 404 page

## 1.1.0

- DB refactoring. Part 1 (#12)
- DB refactoring. Part 2 (#12)
- Implement notesCount and commentariesCount
- Delete useless commentaries
- Update DOCS
- Update favicon.ico

## 1.0.4

- Add support of voting for commentaries
- Fix #13 (extra posts)
- Add user ranking
- Fix links in README

## 1.0.3

- Fix issue #11
- Optimisation for AddInfoModal.tsx
- Fix map lock
- Fix sending email

## 1.0.2

- Added new fields to user (vk, date of registration)
- Added alert in case if user forgot enter your login

## 1.0.1

- Add pages for posts
- Disable annoying debug logs

## 1.0.0

First public release 🎉

- Improve map's zoom
- Fixed sending posts related to existing object
- location reload after log-in
- Fixed CI build by deleting test.ts

## 0.9.9

- New site design

## 0.9.8

- Fix build
- Implement OSM geocoder
- Delete experimental Yandex Maps Geocoder
- Fix bug #8 (TypeError: props.data.map is not a function)
- Delete some old commented lines of code

## 0.9.7

- Optimise Modals.tsx: split file into multiple
- Add comment writing
- Now you can add posts to existing objects
- Replace markdown to HTML in posts and comments
- Improve checking token (made it faster)

## 0.9.6

- Fix password recovery
- Add normal commentaries (not stub)
- Add check for token
- Fix getUserInfo

## 0.9.5

- Add new connection to DB
- Add password recovery
- Add custom 404

## 0.9.4

- Implement new modal  
  User can choose what he want: add post or view posts
- Update README  
  add info about Contributing and Roadmap
  add status
- Delete experimental version of map  
  Now Map is stable!
- Add TODO fix for MongoDB

## 0.9.3

- Add test server for Yandex Maps (very experimental)
- Add Markdown Editor for news
- Fix small bug with AddInfoModal

## 0.9.2

- Add link to changelog to README (both Russian and English versions)
- Add experimental map with search (but without token)
- Fix signin close and add nice alert
- Implement new api method: getPostsByCoords
- Implement object-to-post's link
- Fix usersdb.ts: Add import of deleteKeys

## 0.9.1

- Detalise stack information id docs
- Remove some comments
- Add removeKeys in usersdb.ts

## 0.9.0

- Change docs (add error codes)
- Rename api method: getToken -> sigIn
- Change text in InfoFromDBModal
- Save user id to localStorage
- Fix sending emails after registration
- RegModal small changes
