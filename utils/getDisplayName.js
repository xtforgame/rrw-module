'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDisplayName;
// https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e
function getDisplayName(WrappedComponent) {
  return WrappedComponent && (WrappedComponent.displayName || WrappedComponent.name) || 'Component';
}