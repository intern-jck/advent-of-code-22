class Node {
    constructor(type, name, size = 0) {
        this.type = type;
        this.name = name;
        this.size = size;
        this.content = this.type === 'dir' ? [] : null;
    };

    get nodeInfo() {
        return {
            name: this.name,
            type: this.type,
            size: this.size,
            content: this.content,
        };
    };
};

class Tree {

};
