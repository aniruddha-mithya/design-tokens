# Monorepo example of "dynamic" tokens from tokens studio

To test out the repo follow these steps

1. cd into backend and run `yarn build` followed by `yarn start`.
2. cd into frontend in a different terminal and run `yarn dev`.
3. In the backend, you'll find a very simple express app. Go to design tokens and edit the values in any of the brand files. In a new terminal run yarn build after any change you make to these brand files. No need to run yarn start again if you haven't closed the last process/terminal.
4. Make required changes in app.css

**Note: Make sure to use units in the brand*.json files. SD transforms has not been integrated yet.**
