const createNestedArray = (
  data: Record<string, any>[],
  selectedRoots: string[],
  selectedColumns: string[]
) => {
  const rootNodes = selectedRoots.map((root) => ({
    name: root,
    value: data.reduce((total, item) => total + item[root], 0),
    children: [],
  }));

  data.forEach((item) => {
    selectedRoots.forEach((root, rootIndex) => {
      let currentNode: any = rootNodes[rootIndex];
      selectedColumns.forEach((column) => {
        const value = item[column];
        const existingNode = currentNode.children.find(
          (node: any) => node.name === value
        );

        if (!existingNode) {
          const newNode = {
            name: value,
            value: 0,
            children: [],
          };
          currentNode.children.push(newNode);
          currentNode = newNode;
        } else {
          currentNode = existingNode;
        }

        // Update the value of the parent nodes as well
        currentNode.value += item[root];
      });
    });
  });

  return rootNodes;
};

export default createNestedArray;
