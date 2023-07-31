/* dom.js */

function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    //Q1B
    document.getElementById('advancedWalkBtn').addEventListener('click', function(event) {
        event.preventDefault();
        advancedWalk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    //Q2
    document.getElementById('advancedModifyBtn').addEventListener('click', function(event) {
        event.preventDefault();
        advancedModify();
    });

    //Q3
    document.getElementById('addElementBtn').addEventListener('click', handleAddElement);

    //Q4
    document.getElementById('removeBtn').addEventListener('click', function() {
        let outputDiv = document.getElementById('output');
        if (outputDiv.lastChild) {
            outputDiv.removeChild(outputDiv.lastChild);
        }
    });
    
    document.getElementById('safeDeleteBtn').addEventListener('click', function() {
        let output = document.getElementById('output');
        let child = output.lastElementChild;
        while (child) {
            if(child.nodeName !== 'BUTTON' && child.nodeName !== 'INPUT') {
                output.removeChild(child);
            }
            child = output.lastElementChild;
        }
    });
    
    document.getElementById('deleteBySelectorBtn').addEventListener('click', function() {
        let selector = document.getElementById('selector').value;
        let elements = document.querySelectorAll(selector);
        for (let i = 0; i < elements.length; i++) {
            elements[i].parentNode.removeChild(elements[i]);
        }
    });

    //Q5
    document.getElementById('cloneBasicBtn').addEventListener('click', function(event) {
        event.preventDefault();
        var p1 = document.getElementById('p1');
        var clone = p1.cloneNode(true);
        clone.id = "p1Clone";  
        document.getElementById('output').appendChild(clone);
    });
    
        
    
    document.getElementById('cloneAdvancedBtn').addEventListener('click', function(event) {
        event.preventDefault();
        var template = document.getElementById('cardTemplate');
        var clone = document.importNode(template.content, true);
        document.getElementById('output').appendChild(clone);
    }); 
                   
}

function walk() {
   let el;

   el = document.getElementById('p1');
   showNode(el);

   el = el.firstChild;
   showNode(el);

   el = el.nextSibling;
   showNode(el);

   el = el.lastChild;
   showNode(el);

   el = el.parentNode.parentNode.parentNode;
   showNode(el);

   el = el.querySelector('section > *');
   showNode(el);


}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    //Q1a
    // alert(`Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`);
    let textarea = document.getElementById('walkOutput');
    textarea.value += `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}\n\n`;
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function remove() {
  document.body.removeChild(document.body.lastChild);
}

//Q1B
function advancedWalk() {
    let output = document.getElementById('walkOutput');
    output.value = '';
    traverse(document.body, '', output);
}

function traverse(node, prefix, output) {
    if (node.nodeType === Node.ELEMENT_NODE) { 
        let idText = node.id ? ` id="${node.id}"` : "";
        let classText = node.className ? ` class="${node.className}"` : "";
        output.value += `${prefix}<${node.nodeName}${idText}${classText}>\n`;

        for (let i = 0; i < node.childNodes.length; i++) {
            if (!(node.childNodes[i].nodeType === Node.TEXT_NODE && !(/\S/.test(node.childNodes[i].nodeValue)))) {
                traverse(node.childNodes[i], prefix + '----', output);
            }
        }

        output.value += `${prefix}</${node.nodeName}>\n`;
    }
}

//Q2
function advancedModify() {
    let h1 = document.querySelector('h1');
    h1.textContent = 'DOM Manipulation is Fun!';
    let colorIndex = Math.floor(Math.random() * 6) + 1;
    h1.style.color = `var(--color${colorIndex})`;

    let p = document.querySelector('p');
    p.classList.toggle('shmancy');

    if (p.classList.contains('shmancy')) {
        p.classList.add('animate');
    } else {
        p.classList.remove('animate');
    }
}

//Q3
function handleAddElement() {
    let elementType = document.getElementById('elementType').value;
    let elementContent = document.getElementById('elementContent').value || 'Default Content';
    let newElement;
    const currentTime = new Date().toLocaleString();

    switch(elementType) {
        case 'textNode':
            newElement = document.createTextNode(`New Text Node - ${elementContent} - ${currentTime}`);
            break;
        case 'comment':
            newElement = document.createComment(`New Comment - ${elementContent} - ${currentTime}`);
            break;
        case 'element':
            newElement = document.createElement('p');
            newElement.textContent = `New Element - ${elementContent} - ${currentTime}`;
            break;
        default:
            console.error('Unknown element type');
            return;
    }

    document.getElementById('output').appendChild(newElement);
}
document.getElementById('addElementBtn').addEventListener('click', handleAddElement);


window.addEventListener('DOMContentLoaded', init);
