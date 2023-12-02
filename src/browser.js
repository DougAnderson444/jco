import { $init, generate, generateTypes } from '../obj/js-component-bindgen-component.js';
let initialized = new Promise((resolve, reject) => {
  // Doing this enables us to avoid the top level await that browsers currently don't support
  $init.then(() => {
    resolve(true);
  });
});

export const transpile = function (component, options) {
  // if $init has not yet resolved, wait for it to resolve
  // before calling generate
  // if it has already resolved, pass args directly to generate and retun the result
  return initialized.then(() => {
    return generate(component, options);
  });
};

export { generateTypes };
