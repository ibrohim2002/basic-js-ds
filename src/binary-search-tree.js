const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
    constructor() {
        this._root = null;
    }

    root() {
        return this._root;
    }

    add(data) {
        this._root = addWithin(this._root, data);

        function addWithin(node, data) {
            if (!node) { // если узла нет, то можем добавить
                return new Node(data);
            }
            if (node.data === data) { // если уже есть такое значение, то ничего не делаем просто ввозвращаем узел
                return node;
            }
            if (data < node.data) { // Если значение меньше текущего узла, то добавляем левый угол.
                node.left = addWithin(node.left, data);
            } else { // Иначе в правый.
                node.right = addWithin(node.right, data);
            }
            return node;
        }
    }


    test() {
        return this._root.right;
    }


    has(data) {
        return addWithin(this._root, data);

        function addWithin(node, data) {
            if (!node) { // если узла нет, false
                return false;
            }
            if (node.data === data) { // если есть такое значение, true
                return true;
            }
            return data < node.data ?
                addWithin(node.left, data) // продолжаем поиск в левом поддереве
                :
                addWithin(node.right, data) // Иначе в правом
        }
    }

    find(data) {
        return addWithin(this._root, data);

        function addWithin(node, data) {
            if (!node) {
                return null;
            }
            if (node.data === data) { // если есть такое значение, true
                return node;
            }
            return data < node.data ?
                addWithin(node.left, data) // продолжаем поиск в левом поддереве
                :
                addWithin(node.right, data) // Иначе в правом
        }
    }

    remove(data) {
        this._root = removeNode(this._root, data);

        function removeNode(node, data) {
            if (!node) {
                return null;
            }
            if (node.data === data) { // если нашли его 
                if (!node.left && !node.right) { // и у него нет потомков => просто удаляем
                    return null;
                }
                if (!node.left) { // если нет левого потомка, то возвращаем правого
                    return node.right;
                }
                if (!node.right) { // если нет правого потомка, то возвращаем левого
                    return node.left;
                }
                const min = findMin(node.right); // если есть оба потомка, то находим минимальный элемент в правом поддереве
                node.data = min.data;
                node.right = removeNode(node.right, min.data); // и удаляем его из правого поддерева
                return node;
            }
            if (data < node.data) { // Если значение меньше текущего узла, то добавляем левый узел.
                node.left = removeNode(node.left, data);
            } else { // Иначе в правый.
                node.right = removeNode(node.right, data);
            }
            return node;
        }

        function findMin(node) {
            if (!node.left) {
                return node;
            }
            return findMin(node.left);
        }
    }

    min() {
        return addWithin(this._root);

        function addWithin(node, data) {
            if (!node.left) {
                return node.data;
            }
            return addWithin(node.left, data);
        }
    }

    max() {
        return addWithin(this._root);

        function addWithin(node, data) {
            if (!node.right) {
                return node.data;
            }
            return addWithin(node.right, data);
        }
    }
}

module.exports = {
    BinarySearchTree
};