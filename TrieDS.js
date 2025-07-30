 class Node {
  constructor() {
    this.children = new Array(256).fill(null); 
    this.eow = false; 
  }
}
 class Trie {
  constructor() {
    this.root = new Node();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      const index = char.charCodeAt(0);
      if (!node.children[index]) {
        node.children[index] = new Node();
      }
      node = node.children[index];
    }
    node.eow = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      const index = char.charCodeAt(0);
      if (!node.children[index]) return false;
      node = node.children[index];
    }
    return node.eow;
  }
  startsWith(prefix) {
  let node = this.root;
  for (let char of prefix) {
    const index = char.charCodeAt(0);
    if (!node.children[index]) return []; // prefix not found
    node = node.children[index];
  }

  const results = [];

  const dfs = (curNode, path) => {
    if (curNode.eow) results.push(path);
    for (let i = 0; i < 256; i++) {
      if (curNode.children[i]) {
        dfs(curNode.children[i], path + String.fromCharCode(i));
      }
    }
  };

  dfs(node, prefix);
  return results;
}

}
module.exports = { Node, Trie };