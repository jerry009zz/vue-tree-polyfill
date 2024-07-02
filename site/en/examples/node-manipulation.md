# Node Manipulation {#node-manipulation}

## Custom Node {#custom-node}

There are two ways of customizing nodes:

1. Use named slot `node`
2. Use `render` prop

<CodeDemo component="CustomNode" />

## Drag and Drop {#drag-and-drop}

Enable `draggable` and `droppable`

<CodeDemo component="DragAndDrop" />

## Node Creation and Removal {#node-creation-and-removal}

- Invoke `insertBefore`, `insertAfter` method of tree component to insert new node before and after tree nodes
- Invoke `prepend`, `append` method of tree component to prepend or append to child list
- Invoke `remove` to remove a node

<CodeDemo component="NodeCreationAndRemoval" />
