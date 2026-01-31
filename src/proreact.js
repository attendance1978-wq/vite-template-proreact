/** ProReact Core with JSX, hooks, and head management **/
let wipFiber = null;
let hookIndex = 0;
let headElements = new Set();

export function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.flat().map((c) =>
        typeof c === "object" ? c : createTextElement(c)
      ),
    },
  };
}

function createTextElement(text) {
  return { type: "TEXT_ELEMENT", props: { nodeValue: text, children: [] } };
}

export function render(element, container) {
  container.innerHTML = "";
  wipFiber = { hooks: [], dom: container, props: { children: [element] } };
  hookIndex = 0;
  container.appendChild(createDom(element));
}

function createDom(fiber) {
  if (!fiber) return null;

  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode(fiber.props.nodeValue)
      : document.createElement(fiber.type);

  Object.keys(fiber.props || {})
    .filter((key) => key !== "children")
    .forEach((name) => {
      if (name.startsWith("on")) {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, fiber.props[name]);
      } else if (name === "dangerouslySetInnerHTML") {
        dom.innerHTML = fiber.props[name].__html;
      } else {
        dom[name] = fiber.props[name];
      }
    });

  fiber.props.children?.forEach((child) => dom.appendChild(createDom(child)));

  return dom;
}

// Hooks
export function useState(initial) {
  const oldHook = wipFiber?.hooks?.[hookIndex];
  const hook = { state: oldHook ? oldHook.state : initial, queue: [] };
  const actions = oldHook ? oldHook.queue : [];
  actions.forEach((action) => (hook.state = action(hook.state)));

  const setState = (action) => {
    hook.queue.push(typeof action === "function" ? action : () => action);
    render(wipFiber.props.children[0], wipFiber.dom);
  };

  if (!wipFiber.hooks) wipFiber.hooks = [];
  wipFiber.hooks[hookIndex] = hook;
  hookIndex++;
  return [hook.state, setState];
}

export function useEffect(callback, deps) {
  const oldHook = wipFiber?.hooks?.[hookIndex];
  const hasChanged =
    !oldHook || !deps || deps.some((dep, i) => dep !== oldHook.deps?.[i]);

  if (hasChanged) callback();

  const hook = { deps };
  if (!wipFiber.hooks) wipFiber.hooks = [];
  wipFiber.hooks[hookIndex] = hook;
  hookIndex++;
}

// Head management
export function Head({ title, links = [], metas = [] }) {
  if (title && document.title !== title) document.title = title;

  links.forEach((linkProps) => {
    const id = linkProps.href || linkProps.rel;
    if (!headElements.has(id)) {
      const link = document.createElement("link");
      Object.assign(link, linkProps);
      document.head.appendChild(link);
      headElements.add(id);
    }
  });

  metas.forEach((metaProps) => {
    const id = metaProps.name || metaProps.charset;
    if (!headElements.has(id)) {
      const meta = document.createElement("meta");
      Object.assign(meta, metaProps);
      document.head.appendChild(meta);
      headElements.add(id);
    }
  });

  return null;
}
