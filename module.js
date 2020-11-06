var current_workbook;
var current_app;
window.addEventListener('load', () => {
    //
    current_app = new javex();
    //
    //
    current_app.add_eventlisteners();
});
class app {
    //
    //Construct the object,
    constructor(name) {
        //
        //Set the name of the application.
        this.name = name;
    }
    add_eventlisteners() {
        //
        //Add the login listener.
    }
}
//Modelling javex a a typical application
class javex extends app {
    //
    //Construct the object.
    constructor() {
        //
        //Initialize the peranbt constructor
        super('Javex 1.0');
        //
        //Workbooks of a javex application
        this.workbooks = [];
    }
    //
    add_eventlisteners() {
        //
        //
        super.add_eventlisteners();
        //
        //Add the event listeners to the home page 
        const add = document.querySelector('#add');
        //
        if (add === null)
            throw new Error('Add button not found.');
        //
        add.addEventListener('click', () => {
            //
            //Create a file element.
            const input = document.createElement('input');
            //
            //Set input type to file
            input.type = "file";
            //
            input.onchange = (e) => {
                //
                //Create a new workbook using the file.
                current_workbook = new workbook(input.files[0]);
            };
            //
            //Activate it (click)
            input.click();
        });
        const edit = document.querySelector('#edit');
        //
        if (edit === null)
            throw new Error('Edit button not found.');
        //
        edit.addEventListener('click', () => {
            //
            if (current_workbook === undefined)
                throw new Error('Please select a workbook');
            current_workbook.edit();
        });
    }
}
//Modelling an Excel workbook.
class workbook {
    //
    //Returnd an instance of the class in a succefull construction
    constructor(file) {
        //
        //Decalre the worksheet array and it public.
        this.worksheets = [];
        this.SheetNames = [];
        //
        //Setthe file property.
        this.file = file;
        //
        //Open the workbbok.
        this.read_file();
        //
        //Pusht the workbook to the application.
        current_app.workbooks.push(this);
        //
        //Paint the page with the needed data.
        this.show();
    }
    //
    //Read the file from binary to a js object.
    read_file() {
        //
        //Create a new file reader.
        const fileReader = new FileReader();
        //
        //Onload of the file reader, process the excel workbook.
        fileReader.onload = (e) => {
            //
            //Process the workbook.
            this.process(e.target.result);
        };
        //
        //Read the file as binary...
        fileReader.readAsBinaryString(this.file);
    }
    //
    //Process the workbook:Convert to js object form binary string.
    process(binary_workbook) {
        //
        //Read the Excel File data.
        const workbook = XLSX.read(binary_workbook, {
            type: 'binary'
        });
        //
        //Offload the workbook to this.
        Object.assign(this, workbook);
    }
    //Name of the workbook
    name() { return this.file.name; }
    //
    //Open the workbook in a new window.
    show() {
        //
        //Open a new window 
        const win = window.open('workbook.php');
        //
        //Once the wndow has loaded show all it worksheet.
        win.onload = () => {
            //
            //Get the worksheet from the workbook file.
            this.show_sheets(win);
            //
            //Set onclick event lisener.
            //Add all needed event listeners.
            this.addEventListener(win);
        };
    }
    //
    //Show all the sheets within the workbook.
    show_sheets(win) {
        //
        //Get the parent holder for the sheet names.
        const parent = win.document.querySelector("#sheets_list");
        //
        //Create and li element for the sheets name.
        this.SheetNames.forEach((name) => {
            //
            //Create an li element for the 
            const li = document.createElement("li");
            //
            //Set The text content to the name.
            li.textContent = name;
            //
            //Append to the parent.
            parent.appendChild(li);
        });
    }
    //
    //Add the nneded event listeners to the workbook.
    addEventListener(win) {
        //
        //Add the on click event to handle the upload and describe 
        const upload = win.document.querySelector('#upload');
        //Test for exsistnce of the button
        if (!upload)
            throw new Error("Upload Button not found");
        //Processed...
        upload.addEventListener('click', () => {
            //
            //Use the current workbook to 
        });
        //
        //Paint the page with the worksheet names.
        current_workbook.show_sheets();
        //
        //ADD event listener to the desrive <button id="describe"></button>
        const describe_ = win.document.querySelector('#describe');
        //Test for exsistance...
        if (!describe_)
            throw new Error("Desctibe button not found");
        //
        //Procesed...
        describe_.addEventListener('click', () => {
        });
    }
}
//
//The worksheet equvalent object. This represent a worksheet.
class worksheet {
    //
    //Retuns aninstance of the this.
    constructor(name) {
        //
        //Set the name.
        this.name = name;
    }
    //
    //Get the value
    values() { }
}
