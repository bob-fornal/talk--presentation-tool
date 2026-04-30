// Painful code - "Type instantiation is excessively deep and possibly infinite"
interface Node {
  value: string;
  children?: Node[];
  parent?: Node;
  metadata?: {
    related?: Node[];
    history?: Array<{
      node: Node;
      timestamp: number;
    }>;
  };
}

function findNode(root: Node, predicate: (node: Node) => boolean): Node | undefined {
  // Error: Type instantiation is excessively deep and possibly infinite
  // No indication of HOW to fix it
  if (predicate(root)) return root;
  
  return root.children?.find(child => findNode(child, predicate));
}