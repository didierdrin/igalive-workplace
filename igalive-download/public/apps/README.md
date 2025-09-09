# igaLive apps upload guide

Place signed Android APK files in this folder. Files appear automatically on the download page.

## File naming convention

Use: `name-version-category[-flagship].apk`

- name: short app identifier (no spaces)
- version: semantic version (e.g., 1.4.2)
- category: one of `student`, `teacher`/`instructor`, `course`, `admin`
- flagship: optional literal `flagship` to prioritize the main school app

### Examples
- `school-2.1.0-student-flagship.apk`
- `instructor-tools-1.3.5-instructor.apk`
- `catalog-0.9.0-course.apk`

## Manifests (optional)
Future enhancement can read a JSON manifest per APK for richer metadata. For now, metadata is derived from the file name and filesystem stats.

## Notes
- Only `.apk` files are listed.
- Uploading a new APK automatically shows it after deploy.
- The Download API streams files with appropriate headers.
