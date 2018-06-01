import { h } from './h'
import { render } from './render'
import { Component } from './Component'
import { getInstanceByPath } from './utils/symbols'

const Seact = {
  h,
  createElement: h,
  render,
  Component,
  getInstanceByPath,
}

export default Seact
