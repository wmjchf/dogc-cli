const projectBaseQ = [
  {
    name: "description",
    type: "input",
    message: "Please enter a component-libs description",
  },
  {
    name: "author",
    type: "input",
    message: "Please enter a author",
  },
  {
    name: "homepage",
    type: "input",
    message: "Please enter your homeage",
  },
  {
    name: "homepage",
    type: "input",
    message: "Please enter your homeage",
  },
  {
    name: "repository",
    type: "input",
    message: "Please enter your git repository",
  },
];
// const projectPresetQ = [
//   {
//     name: "preset",
//     type: "list",
//     message: "Please select a preset:",
//     choices: [
//       {
//         name: "Default(ESlint、Babel)",
//         value: "Default",
//         short: "Default",
//       },
//       {
//         name: "Manually select features",
//         value: "Manually",
//         short: "Manually",
//       },
//     ],
//   },
// ];
// const projectFeatureQ = [
//   {
//     name: "feature",
//     type: "checkbox",
//     when: function (answer) {
//       return answer.preset === "Manually";
//     },
//     message: "Please select feature:",
//     choices: [
//       {
//         name: "typescript",
//         value: "typescript",
//         short: "typescript",
//       },
//       {
//         name: "babel",
//         value: "babel",
//         short: "babel",
//       },
//       {
//         name: "eslint",
//         value: "eslint",
//         short: "eslint",
//       },

//       {
//         name: "husky",
//         value: "husky",
//         short: "husky",
//       },
//     ],
//   },
// ];

module.exports = [...projectBaseQ];
