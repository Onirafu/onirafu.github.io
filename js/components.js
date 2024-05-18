//components.js

const DomReady = (handler) => document.addEventListener('DOMContentLoaded', handler);

//Best Function runner
// DomReady(() => {
//     // Your code here
// });


class newComponent {
    constructor(pathFile, targetId) {
        this.pathFile = pathFile;
        this.targetId = targetId;
        this.loadContent();
        this.insertContent();
    }

    loadContent() {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    this.insertContent(xhr.responseText);
                } else {
                    console.error('Failed to fetch content: ' + xhr.status);
                }
            }
        };
        xhr.open('GET', this.pathFile, true);
        xhr.send();
    }

    insertContent(content) {
        var targetElement = document.getElementById(this.targetId);
        if (targetElement) {
            targetElement.innerHTML = content;
        } else {
            console.error('Target element not found: ' + this.targetId);
        }
    }
}


