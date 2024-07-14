class Graph {
    constructor() {
        this.nodes = {};
    }

    addEdge(src, dest, weight) {
        if (!this.nodes[src]) this.nodes[src] = [];
        if (!this.nodes[dest]) this.nodes[dest] = [];
        this.nodes[src].push({ node: dest, weight: weight });
        this.nodes[dest].push({ node: src, weight: weight });
    }

    dijkstra(start, end) {
        let distances = {};
        let parents = {};
        let pq = new PriorityQueue();

        for (let node in this.nodes) {
            if (node === start) {
                distances[node] = 0;
                pq.enqueue(node, 0);
            } else {
                distances[node] = Infinity;
            }
            parents[node] = null;
        }

        while (!pq.isEmpty()) {
            let shortestStep = pq.dequeue();
            let currentNode = shortestStep.element;

            this.nodes[currentNode].forEach(neighbor => {
                let alt = distances[currentNode] + neighbor.weight;
                if (alt < distances[neighbor.node]) {
                    distances[neighbor.node] = alt;
                    parents[neighbor.node] = currentNode;
                    pq.enqueue(neighbor.node, distances[neighbor.node]);
                }
            });
        }

        let path = [];
        let temp = end;
        while (temp) {
            path.push(temp);
            temp = parents[temp];
        }
        path.reverse();

        return { distance: distances[end], path: path };
    }
}

class PriorityQueue {
    constructor() {
        this.collection = [];
    }

    enqueue(element, priority) {
        let newElement = { element, priority };
        if (this.isEmpty()) {
            this.collection.push(newElement);
        } else {
            let added = false;
            for (let i = 0; i < this.collection.length; i++) {
                if (newElement.priority < this.collection[i].priority) {
                    this.collection.splice(i, 0, newElement);
                    added = true;
                    break;
                }
            }
            if (!added) {
                this.collection.push(newElement);
            }
        }
    }

    dequeue() {
        return this.collection.shift();
    }

    isEmpty() {
        return this.collection.length === 0;
    }
}

const graph = new Graph();
const cities = [
    { src: "Flipkart Office", dest: "RailWay Station", weight: 3.4 },
    { src: "Flipkart Office", dest: "City", weight: 1 },
    { src: "Flipkart Office", dest: "New Model Town", weight: 4.1 },
    { src: "Flipkart Office", dest: "Hargobind Nagar", weight: 3.8 },
    { src: "RailWay Station", dest: "New Model Town", weight: 1.7 },
    { src: "City", dest: "JJ School", weight: 3 },
    { src: "Hargobind Nagar", dest: "Friends Colony", weight: 1.7 },
    { src: "Friends Colony", dest: "Shiv Puri", weight: 1.5 },
    { src: "New Model Town", dest: "JCT Mill", weight: 0.9 },
    { src: "JCT Mill", dest: "Thaper Colony", weight: 0.9 },
    { src: "Thaper Colony", dest: "Sham Nagar", weight: 2 },
    { src: "Sham Nagar", dest: "Shiv Puri", weight: 0.5 },
    { src: "Sham Nagar", dest: "Pipa Rangi", weight: 0.6 },
    { src: "Shiv Puri", dest: "Board Thale", weight: 0.8 },
    { src: "Shiv Puri", dest: "Onkar Nagar", weight: 0.7 },
    { src: "Board Thale", dest: "Urban Estate", weight: 2 },
    { src: "Onkar Nagar", dest: "Urban Estate", weight: 2.5 },
    { src: "Onkar Nagar", dest: "Board Thale", weight: 1 },
    { src: "Urban Estate", dest: "Industrial Area", weight: 1.5 },
    { src: "Industrial Area", dest: "Central Bank", weight: 0.3 },
    { src: "Pipa Rangi", dest: "Onkar Nagar", weight: 1.7 },
    { src: "Shiv Puri", dest: "Ratan Pura", weight: 2.6 },
    { src: "Ratan Pura", dest: "Central Bank", weight: 1.6 },
];

cities.forEach(({ src, dest, weight }) => {
    graph.addEdge(src, dest, weight);
});

const startSelect = document.getElementById('start');
const endSelect = document.getElementById('end');
const cityNames = new Set();

cities.forEach(({ src, dest }) => {
    cityNames.add(src);
    cityNames.add(dest);
});

cityNames.forEach(city => {
    const option1 = document.createElement('option');
    option1.value = city;
    option1.text = city;
    startSelect.add(option1);

    const option2 = document.createElement('option');
    option2.value = city;
    option2.text = city;
    endSelect.add(option2);
});

document.getElementById('findPath').addEventListener('click', () => {
    const start = startSelect.value;
    const end = endSelect.value;

    if (start && end) {
        const result = graph.dijkstra(start, end);

        if (result.distance < Infinity) {
            document.getElementById('result').textContent = `Shortest distance from ${start} to ${end} is ${result.distance.toFixed(2)} Km`;
            document.getElementById('path').textContent = `Path: ${result.path.join(' -> ')}`;
        } else {
            document.getElementById('result').textContent = 'No path found';
            document.getElementById('path').textContent = '';
        }
    } else {
        document.getElementById('result').textContent = 'Please select both start and end points';
        document.getElementById('path').textContent = '';
    }
});
