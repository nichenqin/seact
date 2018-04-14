export const hooks = {
  RENDER: 'render',
  WILL_MOUNT: 'componentWillMount',
  DID_MOUNT: 'componentDidMount',
}

// eslint-disable-next-line
export function callHook(vlayerInstance, hookName, ...args) {
  try {
    if (vlayerInstance[hookName]) {
      const isRender = hookName === hooks.RENDER
      if (isRender) {
        return vlayerInstance[hookName]()
      }
      return vlayerInstance[hookName](...args)
    }
  } catch (error) {
    //
  }
}
