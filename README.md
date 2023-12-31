# Markdown Editor and Previewer

This repository contains a simple React application that serves as a Markdown editor and previewer. The application is divided into two main components:

## Markdown Editor

The `MarkdownEditor` component provides a textarea where users can input Markdown text. It includes a toolbar with a title and an icon. Changes in the editor trigger a callback function (`onEditorChange`) that updates the state in the main `App` component.

## Markdown Previewer

The `MarkdownPreviewer` component renders a preview of the Markdown content. It utilizes the `marked` library to convert the Markdown text to HTML and displays it in a div. Similar to the editor, it includes a toolbar with a title and an icon.

## Toolbar

The `ToolBar` component is a reusable component that displays a simple toolbar with a title and icons. Icons include a FreeCodeCamp logo and an arrows icon.

## App Component

The main `App` component holds the state for the Markdown content and renders both the `MarkdownEditor` and `MarkdownPreviewer` components. Changes in the editor are reflected in the previewer through state management.

## Usage

1. Clone the repository: `git clone https://github.com/your-username/your-repository.git`
2. Navigate to the project directory: `cd your-repository`
3. Install dependencies: `npm install`
4. Start the application: `npm start`

Feel free to modify and enhance the application according to your needs.