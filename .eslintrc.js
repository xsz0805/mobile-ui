module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    // "plugin:vue/recommended",
    // '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // "vue/order-in-components": [
    //   "error",
    //   {
    //     "order": [
    //       "el",
    //       "name",
    //       "key",
    //       "parent",
    //       "functional",
    //       ["delimiters", "comments"],
    //       ["components", "directives", "filters"],
    //       "extends",
    //       "mixins",
    //       ["provide", "inject"],
    //       "ROUTER_GUARDS",
    //       "layout",
    //       "middleware",
    //       "validate",
    //       "scrollToTop",
    //       "transition",
    //       "loading",
    //       "inheritAttrs",
    //       "model",
    //       ["props", "propsData"],
    //       "emits",
    //       "setup",
    //       "fetch",
    //       "asyncData",
    //       "data",
    //       "head",
    //       "computed",
    //       "watch",
    //       "watchQuery",
    //       "LIFECYCLE_HOOKS",
    //       "methods",
    //       ["template", "render"],
    //       "renderError"
    //     ]
    //   }
    // ],

    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    

  }
}
