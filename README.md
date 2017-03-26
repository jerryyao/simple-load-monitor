# Simple Load Monitor

Simple live CPU monitor built in React and D3.

## Screenshot

![Screenshot](https://github.com/teopalva/simple-load-monitor/blob/master/public/img/screenshot.png)

## Getting Started

### Run
  `git clone https://github.com/teopalva/simple-load-monitor.git`<br>
  `cd simple-load-monitor`<br>
  `npm start`

  Then visit http://localhost:3000/.

### Develop
  `npm run dev`

### Test
  `npm test`

## Tech stack
- node.js
- express.js
- socket.io
- os-monitor
- react
- redux
- D3.js
- webpack
- ES6 / babel
- CSS modules

## Approach
The tech stack chosen for this small project includes a number of libraries and frameworks that is clearly over-complicated for such a restricted scope. The idea here is to show, instead, how these technologies could potentially be combined to build a similar, real-life project at a much bigger scale.

The unidirectional data flow on the client, managed by Redux, allows to easily propagate data coming from the server through the web socket and to handle user interactions with the UI.<br>
React is useful to build the UI by composing components. These can even be graphs: rendering a line chart on a page is as easy as importing a `<LineChart/>` component from a shared library and customizing the graph with the desired input props.<br>
The graph itself is built with a hybrid approach: React takes care of rendering the shell svg for the chart, while D3 is leveraged to do the underlying math and return the updated description for the line's `path`. The X and Y axes are added to DOM in a different way: we hook into React's lifecycle methods and use D3 to directly execute the DOM manipulation right after every re-render. This highlights the different nature between React (declarative, DOM diffing) and D3 (imperative API, direct DOM manipulation). In a real-life project we would use a consistent approach, ideally leveraging React for all of the rendering and diffing operations and D3 for the math and its data visualization algorithms. A similar approach is used in Uber's  [react-vis](https://github.com/uber/react-vis) library.

## Assumptions
- The metric used to measure CPU load is *load average* for the past 1 minute (from the `uptime` Unix command).
- Monitor events are measured and sent from the server to the client every 10 seconds.
- The history of all monitor events holds data for the past 10 minutes.
- An alert is triggered when the average load over the past 2 minutes was over a threshold. This threshold has been set to 3 for an 8-cores CPU, but could be easily parametrized and selected by the user.
- After an alert event, a recovery event is triggered if the average load for the next 2 minutes is under the alert threshold. Otherwise, a new alert is triggered.

## Future improvements
- Introduce a database for persistent storage of events on the server. In this example everything is kept in memory for simplicity.
- Incrementally send monitor data to the client after initial load. In this example we send to the client the whole history of monitors every time a new data point is collected, resulting in overhead over the network. This would require having the concept of *queue* of events on the client as well.
- In this example the `Queue` data structure is just a wrapper for an array, but its implementation could become more complex and performant to work on larger data sets. It is decoupled from the server logic, so we could replace the implementation without breaking anything if the API stays the same.
- Avoid duplicating data points in a 2-minutes event buffer if the same data is also stored in the 10-minutes history queue.
- Improve the integration between React and D3 and build a library of graph components.
- Improve CSS support by adding variables and other utilities to css modules, e.g. using `post-css`.
- Add support for rendering of React server-side for optimal page load. This is only worth doing if we care about page load time and SEO concerns in production.
