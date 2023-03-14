class Component {
    constructor(template, displayParams, modifiers, textContent, events) {
        this.template = template;
        this.displayParams = displayParams;
        this.modifiers = modifiers;
        this.textContent = textContent;
        this.events = events;
    }

    generate() {
        const element = document.createElement(this.template);

        //свойства
        if (this.displayParams) {
            Object.keys(this.displayParams).forEach(key => {
                element[key] = this.displayParams[key];
                element.style.margin = '5px';
            });
        }
        //модификаторы
        if (this.modifiers) {
            element.classList.add(...this.modifiers);
        }
        //текст
        if (this.textContent) {
            element.textContent = this.textContent;
        }
        //ивенты
        if (this.events) {
            Object.keys(this.events).forEach(key => {
                element.addEventListener(key, this.events[key]);
            });
        }

        return element;
    }
}

//кнопка 1 отключена параметром "disabled"
const button1 = new Component(
    'button',
    { innerText: 'Кнопка 1'},
    ['btn', 'btn-lg', 'btn-success', 'disabled'],
    ['Отключена']
).generate();

const button2 = new Component(
    'button',
    { innerText: 'Кнопка 2'},
    ['btn', 'btn-info', 'btn-lg'],
    ['Кликни'],
    { click: () => alert(' Ты кликнул на кнопку')}
).generate();

const button3 = new Component(
    'button',
    { innerText: 'Кнопка 3'},
    ['btn', 'btn-primary', 'btn-lg', 'active'],
    ['Кликни правой кнопкой мыши'],
    {contextmenu: () => alert(' Ты кликнул ПКМ на кнопку')} //вместо alert я бы использовала popup, но в тз этого не было:)
).generate();


const button4 = new Component(
    'button',
    { innerText: 'Кнопка 4' },
    ['btn', 'btn-outline-danger'],
    ['Наведи'],
    {mouseover: () => {
            let help = button4.querySelector('.help');
            if (!help) {
                help = new Component(
                    'span',
                    null,
                    ['help'],
                    'Ты навел на кнопку',
                    null
                ).generate();
                button4.appendChild(help);
            }
            help.style.display = 'block';
        },
        mouseout: () => {
            const help = button4.querySelector('.help');
            if (help) {
                help.style.display = 'none';
            }
        }
    }
).generate();

const button5 = new Component(
    'button',
    { innerText: 'Кнопка 5'},
    ['btn', 'btn-secondary', 'btn-sm', 'active'],
    ['Сделай двойной клик'],
    {dblclick: () => alert(' Ты сделал даблклик на кнопку')}
).generate();

const button6 = new Component(
    'button',
    { innerText: 'Кнопка 6'},
    ['btn', 'btn-warning', 'btn-sm', 'active'],
    ['Кликни и удерживай кнопку'],
    {mousedown: () => {
            let retention = button6.querySelector('.retention');
            if (!retention) {
                retention = new Component(
                    'span',
                    null,
                    ['retention'],
                    'Ты удерживаешь кнопку, отпусти',
                    null
                ).generate();
                button6.appendChild(retention);
            }
            retention.style.display = 'block';
        },
        mouseup: () => {
            const retention = button6.querySelector('.retention');
            if (retention) {
                retention.style.display = 'none';
            }
        }}
).generate();

//вместо alert я бы использовала popup, но в тз этого не было:)

document.body.appendChild(button1);
document.body.appendChild(button2);
document.body.appendChild(button3);
document.body.appendChild(button4);
document.body.appendChild(button5);
document.body.appendChild(button6);
