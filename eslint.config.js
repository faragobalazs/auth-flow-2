import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        Buffer: "readonly",
        global: "readonly",
      },
    },
    rules: {
      // Disallow CommonJS require() calls
      "no-undef": "error",
      "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],

      // Custom rules to catch CommonJS patterns
      "no-restricted-globals": [
        "error",
        {
          name: "require",
          message: "Use ES6 import instead of require()",
        },
        {
          name: "module",
          message: "Use ES6 export instead of module.exports",
        },
        {
          name: "exports",
          message: "Use ES6 export instead of exports",
        },
      ],

      // Disallow assignment to exports
      "no-restricted-syntax": [
        "error",
        {
          selector:
            'MemberExpression[object.name="module"][property.name="exports"]',
          message: "Use ES6 export instead of module.exports",
        },
        {
          selector: 'AssignmentExpression[left.object.name="exports"]',
          message: "Use ES6 export instead of exports",
        },
        {
          selector: 'CallExpression[callee.name="require"]',
          message: "Use ES6 import instead of require()",
        },
      ],
    },
  },
];
