import {
  $init,
  generate,
  generateTypes,
} from "../obj/js-component-bindgen-component.js";

// The anonymous function will return a promise, which we will await before calling generate
let initialized = (() =>
  new Promise((resolve, reject) => {
    // Doing this enables us to avoid the top level await that browsers currently don't support
    $init.then(() => {
      resolve(true);
    });
  }))();

/**
 * Transpile a component into a JS module
 * @param {Object} component - The component to transpile
 * @param {Object} options - Options for transpiling
 *
 * @returns {Promise} - A promise that resolves to the transpiled component
 */
export const transpile = function (component, options) {
  // if $init has not yet resolved, wait for it to resolve
  // before calling generate
  // if it has already resolved, `then` will be called right away
  // and pass args directly to generate, returning the result
  return initialized.then(() => {
    return generate(component, options);
  });
};

export { generateTypes };
