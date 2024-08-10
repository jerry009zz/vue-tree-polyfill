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

## Update Node Title {#update-node-title}

Invoke `updateNode` method to update some fields of tree node

Invoke `updateNodes` to update multiple nodes

<CodeDemo component="UpdateNodeTitle" />

## Update Custom Field {#update-custom-field}

Invoke `updateNode` method to update custom fields in tree node

<CodeDemo component="UpdateCustomField" />

## Reload Child Nodes {#reload-children}

Invoke `updateNode` and pass a new `children` list to reload child nodes

<CodeDemo component="ReloadChildren" />
